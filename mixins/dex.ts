import type { DexPool, FieldTotalContributions, FiledBalances, FiledPools, Share } from '@/types/zilliqa';
import type { SwapPair } from '@/types/swap';

import Big from 'big.js';

import { Blockchain } from './custom-fetch';
import { ZilPayBase } from './zilpay-base';

import { $tokens, addToken, updateTokens } from '@/store/tokens';

import { toHex } from '@/lib/to-hex';
import { formatNumber } from '@/filters/n-format';
import { addTransactions } from '@/store/transactions';
import { NET, SHARE_PERCENT, ZERO_ADDR } from '@/config/conts';
import { $liquidity, updateDexBalances, updateLiquidity } from '@/store/shares';
import { $wallet } from '@/store/wallet';
import { $settings } from '@/store/settings';
import { TokenState } from '@/types/token';
import { $net } from '@/store/netwrok';


Big.PE = 999;

export enum SwapDirection {
  ZilToToken,
  TokenToZil,
  TokenToTokens
}

const CONTRACTS: {
  [net: string]: string;
} = {
  'mainnet': '',
  'testnet': '0x45a266fa784a9f2955fee237589c2a48c0e08132',
  'private': ''
};

export class DragonDex {
  public static REWARDS_DECIMALS = BigInt('100000000000');
  public static FEE_DEMON = BigInt('10000');

  private _provider = new Blockchain();

  public zilpay = new ZilPayBase();

  public lp = BigInt(0);
  public fee = BigInt(10000);
  public protoFee = BigInt(500);

  public get wallet() {
    return $wallet.state;
  }

  public get contract() {
    return CONTRACTS[$net.state.net];
  }

  public get pools() {
    return $liquidity.state.pools;
  }

  public get tokens() {
    return $tokens.state.tokens;
  }

  public get liquidityRewards() {
    const demon = Number(DragonDex.FEE_DEMON);
    return (demon - Number(this.fee)) / demon;
  }

  public async updateState() {
    const contract = toHex(this.contract);
    const { pools, balances, totalContributions, protocolFee, liquidityFee } = await this._provider.fetchFullState(contract);
    const shares = this._getShares(balances, totalContributions);
    const dexPools = this._getPools(pools);

    this.fee = BigInt(liquidityFee);
    this.protoFee = BigInt(protocolFee);

    updateDexBalances(balances);
    updateLiquidity(shares, dexPools);
  }

  public async updateTokens() {
    const owner = String($wallet.state?.base16);
    const newTokens = await this._provider.fetchTokensBalances(owner, $tokens.state.tokens);

    updateTokens(newTokens);
  }

  public async addCustomToken(token: string, owner: string) {
    const { meta, balances } = await this._provider.getToken(token, owner);
    const zp = await this.zilpay.zilpay();
    addToken({
      meta: {
        base16: meta.address,
        bech32: zp.crypto.toBech32Address(meta.address),
        symbol: meta.symbol,
        name: meta.name,
        decimals: meta.decimals,
        scope: 0
      },
      balance: balances
    });
  }

  public getRealPrice(pair: SwapPair[]) {
    const [exactToken, limitToken] = pair;
    const exact = this._valueToBigInt(exactToken.value, exactToken.meta);
    let value = BigInt(0);

    if (exactToken.meta.base16 === ZERO_ADDR && limitToken.meta.base16 !== ZERO_ADDR) {
      value = this._zilToTokens(exact, this.pools[limitToken.meta.base16]);
    } else if (exactToken.meta.base16 !== ZERO_ADDR && limitToken.meta.base16 === ZERO_ADDR) {
      value = this._tokensToZil(exact, this.pools[exactToken.meta.base16]);
    } else {
      value = this._tokensToTokens(exact, this.pools[exactToken.meta.base16], this.pools[limitToken.meta.base16]);
    }

    return Big(String(value)).div(this.toDecimails(limitToken.meta.decimals));
  }

  public getDirection(pair: SwapPair[]) {
    const [exactToken, limitToken] = pair;

    if (exactToken.meta.base16 === ZERO_ADDR && limitToken.meta.base16 !== ZERO_ADDR) {
      return SwapDirection.ZilToToken;
    } else if (exactToken.meta.base16 !== ZERO_ADDR && limitToken.meta.base16 === ZERO_ADDR) {
      return SwapDirection.TokenToZil;
    } else {
      return SwapDirection.TokenToTokens;
    }
  }

  public tokensToZil(value: string | Big, token: TokenState) {
    const amount = Big(value);

    try {
      const decimals = this.toDecimails(token.decimals);
      const zilDecimails = this.toDecimails(this.tokens[0].meta.decimals);
      const qa = amount.mul(decimals).round().toString();
      const zils = this._tokensToZil(BigInt(qa), this.pools[token.base16]);

      return Big(String(zils)).div(zilDecimails);
    } catch {
      return Big(0);
    }
  }

  public async swapExactZILForTokens(exact: bigint, limit: bigint, token: TokenState) {
    const { blocks } = $settings.state;
    const limitAfterSlippage = this.afterSlippage(limit);
    const { NumTxBlocks } = await this.zilpay.getBlockchainInfo();
    const nextBlock = Big(NumTxBlocks).add(blocks);
    const params = [
      {
        vname: 'token_address',
        type: 'ByStr20',
        value: token.base16
      },
      {
        vname: 'min_token_amount',
        type: 'Uint128',
        value: String(limitAfterSlippage)
      },
      {
        vname: 'deadline_block',
        type: 'BNum',
        value: String(nextBlock)
      },
      {
        vname: 'recipient_address',
        type: 'ByStr20',
        value: String(this.wallet?.base16).toLowerCase()
      }
    ];
    const contractAddress = this.contract;
    const transition = 'SwapExactZILForTokens';
    const res = await this.zilpay.call({
      params,
      contractAddress,
      transition,
      amount: String(exact)
    }, this.calcGasLimit(SwapDirection.ZilToToken).toString());

    const amount = Big(String(exact)).div(this.toDecimails(this.tokens[0].meta.decimals)).toString();
    const limitAmount = Big(String(limit)).div(this.toDecimails(token.decimals)).toString();
    addTransactions({
      timestamp: new Date().getTime(),
      name: `Swap exact (${formatNumber(amount)} ZIL), to (${formatNumber(limitAmount)} ${token.symbol})`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return res;
  }

  public async swapExactTokensForZIL(exact: bigint, limit: bigint, token: TokenState) {
    const { blocks } = $settings.state;
    const limitAfterSlippage = this.afterSlippage(limit);
    const { NumTxBlocks } = await this.zilpay.getBlockchainInfo();
    const nextBlock = Big(NumTxBlocks).add(blocks);
    const params = [
      {
        vname: 'token_address',
        type: 'ByStr20',
        value: token.base16
      },
      {
        vname: 'token_amount',
        type: 'Uint128',
        value: String(exact)
      },
      {
        vname: 'min_zil_amount',
        type: 'Uint128',
        value: String(limitAfterSlippage)
      },
      {
        vname: 'deadline_block',
        type: 'BNum',
        value: String(nextBlock)
      },
      {
        vname: 'recipient_address',
        type: 'ByStr20',
        value: String(this.wallet?.base16).toLowerCase()
      }
    ];
    const contractAddress = this.contract;
    const transition = 'SwapExactTokensForZIL';
    const res = await this.zilpay.call({
      params,
      contractAddress,
      transition,
      amount: '0'
    }, this.calcGasLimit(SwapDirection.TokenToZil).toString());

    const amount = Big(String(exact)).div(this.toDecimails(token.decimals)).toString();
    const limitAmount = Big(String(limit)).div(this.toDecimails(this.tokens[0].meta.decimals)).toString();
    addTransactions({
      timestamp: new Date().getTime(),
      name: `Swap exact (${formatNumber(amount)} ${token.symbol}) to (${formatNumber(limitAmount)} ZIL)`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return res;
  }

  public async swapExactTokensForTokens(exact: bigint, limit: bigint, inputToken: TokenState, outputToken: TokenState) {
    const contractAddress = this.contract;
    const { blocks } = $settings.state;
    const limitAfterSlippage = this.afterSlippage(limit);
    const { NumTxBlocks } = await this.zilpay.getBlockchainInfo();
    const nextBlock = Big(NumTxBlocks).add(blocks);
    const params = [
      {
        vname: 'token0_address',
        type: 'ByStr20',
        value: inputToken.base16
      },
      {
        vname: 'token1_address',
        type: 'ByStr20',
        value: outputToken.base16
      },
      {
        vname: 'token0_amount',
        type: 'Uint128',
        value: String(exact)
      },
      {
        vname: 'min_token1_amount',
        type: 'Uint128',
        value: String(limitAfterSlippage)
      },
      {
        vname: 'deadline_block',
        type: 'BNum',
        value: String(nextBlock)
      },
      {
        vname: 'recipient_address',
        type: 'ByStr20',
        value: String(this.wallet?.base16).toLowerCase()
      }
    ];
    const transition = 'SwapExactTokensForTokens';
    const res = await this.zilpay.call({
      params,
      contractAddress,
      transition,
      amount: '0'
    }, this.calcGasLimit(SwapDirection.TokenToTokens).toString());

    const amount = formatNumber(Big(String(exact)).div(this.toDecimails(inputToken.decimals)).toString());
    const receivedAmount = formatNumber(Big(String(limit)).div(this.toDecimails(outputToken.decimals)).toString());
    addTransactions({
      timestamp: new Date().getTime(),
      name: `Swap exact (${formatNumber(amount)} ${inputToken.symbol}) to (${formatNumber(receivedAmount)} ${outputToken.symbol})`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return res;
  }

  public async addLiquidity(addr: string, amount: Big, limit: Big) {
    const contractAddress = this.contract;
    const { blocks } = $settings.state;
    const { blockNum, totalContributions, pool } = await this._provider.getBlockTotalContributions(
      contractAddress,
      addr
    );
    const zilReserve = BigInt(pool[0]);
    const nextBlock = Big(blockNum).add(blocks);
    const minContributionAmount = zilReserve === BigInt(0) ? BigInt(limit.toString()) : this._fraction(
      BigInt(limit.toString()),
      BigInt(zilReserve),
      BigInt(totalContributions)
    );
    const limitAfterSlippage = this.afterSlippage(minContributionAmount);
    const params = [
      {
        vname: 'token_address',
        type: 'ByStr20',
        value: addr
      },
      {
        vname: 'min_contribution_amount',
        type: 'Uint128',
        value: String(limitAfterSlippage)
      },
      {
        vname: 'max_token_amount',
        type: 'Uint128',
        value: String(amount)
      },
      {
        vname: 'deadline_block',
        type: 'BNum',
        value: String(nextBlock)
      }
    ];
    const transition = 'AddLiquidity';
    const res = await this.zilpay.call({
      params,
      contractAddress,
      transition,
      amount: String(limit)
    }, '3060');

    const found = this.tokens.find((t) => t.meta.base16 === addr);

    if (found) {
      const max = amount.div(this.toDecimails(found.meta.decimals)).toString();
      addTransactions({
        timestamp: new Date().getTime(),
        name: `addLiquidity maximum ${formatNumber(max)} ${found.meta.symbol}`,
        confirmed: false,
        hash: res.ID,
        from: res.from
      });
    }

    return res.ID;
  }

  public async removeLiquidity(minzil: Big, minzrc: Big, minContributionAmount: Big, token: string, owner: string) {
    const contractAddress = this.contract;
    const { blocks } = $settings.state;
    const { blockNum } = await this._provider.getUserBlockTotalContributions(
      contractAddress,
      token,
      owner
    );
    const nextBlock = Big(blockNum).add(blocks);
    const params = [
      {
        vname: 'token_address',
        type: 'ByStr20',
        value: token
      },
      {
        vname: 'contribution_amount',
        type: 'Uint128',
        value: String(minContributionAmount)
      },
      {
        vname: 'min_zil_amount',
        type: 'Uint128',
        value: String(minzil)
      },
      {
        vname: 'min_token_amount',
        type: 'Uint128',
        value: String(minzrc)
      },
      {
        vname: 'deadline_block',
        type: 'BNum',
        value: String(nextBlock)
      }
    ];
    const transition = 'RemoveLiquidity';
    const res = await this.zilpay.call({
      params,
      contractAddress,
      transition,
      amount: '0'
    }, '3060');

    addTransactions({
      timestamp: new Date().getTime(),
      name: `RemoveLiquidity`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return res;
  }

  public toDecimails(decimals: number) {
    return Big(10**decimals);
  }

  public afterSlippage(amount: bigint) {
    const slippage = $settings.state.slippage;

    if (slippage <= 0) {
      return amount;
    }

    const _slippage = DragonDex.FEE_DEMON - BigInt(slippage * 100);

    return amount * _slippage / DragonDex.FEE_DEMON;
  }

  public calcGasLimit(direction: SwapDirection) {
    switch (direction) {
      case SwapDirection.ZilToToken:
        return Big(2637);
      case SwapDirection.TokenToZil:
        return Big(3163);
      case SwapDirection.TokenToTokens:
        return Big(4183);
      default:
        return Big(5000);
    }
  }

  public calcPriceImpact(priceInput: Big, priceOutput: Big, currentPrice: Big) {
    const nextPrice = priceInput.div(priceOutput);
    const priceDiff = nextPrice.sub(currentPrice);
    const value = priceDiff.div(currentPrice);
    const _100 = Big(100);
    const imact = value.mul(_100).round(3).toNumber();
    const v = Math.abs(imact);

    return v > 100 ? 100 : v;
  }

  public calcVirtualAmount(amount: Big, token: TokenState, pool: string[]) {
    if (!pool || pool.length < 2) {
      return Big(0);
    }

    const zilReserve = Big(String(pool[0])).div(this.toDecimails($tokens.state.tokens[0].meta.decimals));
    const tokensReserve = Big(String(pool[1])).div(this.toDecimails(token.decimals));
    const zilRate = zilReserve.div(tokensReserve);
  
    return amount.mul(zilRate);
  }

  public sleepageCalc(value: string) {
    const slippage = $settings.state.slippage;

    if (slippage <= 0) {
      return value;
    }

    const amount = Big(value);
    const demon = Big(String(DragonDex.FEE_DEMON));
    const slip = demon.sub(slippage * 100);

    return amount.mul(slip).div(demon);
  }

  private _fraction(d: bigint, x: bigint, y: bigint) {
    return (d * y) / x;
  }

  private _zilToTokens(amount: bigint, inputPool: string[]) {
    const [zilReserve, tokenReserve] = inputPool;
    const amountAfterFee = this.protoFee === BigInt(0) ? amount : amount - (amount / this.protoFee);
    return this._outputFor(amountAfterFee, BigInt(zilReserve), BigInt(tokenReserve));
  }

  private _tokensToZil(amount: bigint, inputPool: string[]) {
    const [zilReserve, tokenReserve] = inputPool;
    const zils = this._outputFor(amount, BigInt(tokenReserve), BigInt(zilReserve));

    return this.protoFee === BigInt(0) ? zils : zils - (zils / this.protoFee);
  }

  private _tokensToTokens(amount: bigint, inputPool: string[], outputPool: string[]) {
    const [inputZilReserve, inputTokenReserve] = inputPool;
    const [outputZilReserve, outputTokenReserve] = outputPool;
    const zilIntermediateAmount = this._outputFor(
      amount,
      BigInt(inputTokenReserve),
      BigInt(inputZilReserve),
      DragonDex.FEE_DEMON
    );
    const zils = this.protoFee === BigInt(0) ?
      zilIntermediateAmount : zilIntermediateAmount - (zilIntermediateAmount / this.protoFee);

    return this._outputFor(zils, BigInt(outputZilReserve), BigInt(outputTokenReserve));
  }

  private _outputFor(exactAmount: bigint, inputReserve: bigint, outputReserve: bigint, fee: bigint = this.fee) {
    const exactAmountAfterFee = exactAmount * fee;
    const numerator = exactAmountAfterFee * outputReserve;
    const inputReserveAfterFee = inputReserve * DragonDex.FEE_DEMON;
    const denominator = inputReserveAfterFee + exactAmountAfterFee;

    return numerator / denominator;
  }

  private _getShares(balances: FiledBalances, totalContributions: FieldTotalContributions) {
    const shares: Share = {};

    for (const token in balances) {
      const contribution = BigInt(totalContributions[token]);

      for (const owner in balances[token]) {
        const balance = BigInt(balances[token][owner]);

        if (!shares[token]) {
          shares[token] = {};
        }

        shares[token][owner] = (balance * SHARE_PERCENT) / contribution;
      }
    }

    return shares;
  }

  private _getPools(pools: FiledPools) {
    const newPools: DexPool = {};

    for (const token in pools) {
      const [x, y] = pools[token].arguments;

      newPools[token] = [x, y];
    }

    return newPools;
  }

  private _valueToBigInt(amount: string, token: TokenState) {
    return BigInt(
      Big(amount).mul(this.toDecimails(token.decimals)).round().toString()
    );
  }
}
