import type { DexPool, FieldTotalContributions, FiledBalances, FiledPools, Share } from '@/types/zilliqa';
import type { SwapPair } from '@/types/swap';

import Big from 'big.js';

import { Blockchain } from './custom-fetch';
import { ZilPayBase } from './zilpay-base';

import { $tokens, addToken, updateTokens } from '@/store/tokens';

import { formatNumber } from '@/filters/n-format';
import { addTransactions } from '@/store/transactions';
import { SHARE_PERCENT, ZERO_ADDR } from '@/config/conts';
import { $liquidity, updateDexBalances, updateLiquidity } from '@/store/shares';
import { $wallet } from '@/store/wallet';
import { $settings } from '@/store/settings';
import { TokenState } from '@/types/token';
import { $net } from '@/store/netwrok';
import { $dex } from '@/store/dex';
import { toHex } from '@/lib/to-hex';

const PROY_ZILSWAP = "0xcccfdec2c9842f3f7ece2b9be996e814d59ca0cc".toLowerCase();


Big.PE = 999;

export enum SwapDirection {
  ZilToToken,
  TokenToZil,
  TokenToTokens
}

const CONTRACTS: {
  [net: string]: string;
} = {
  'mainnet': '0x459CB2d3BAF7e61cFbD5FE362f289aE92b2BaBb0',
  'testnet': '0xb0c677b5ba660925a8f1d5d9687d0c2c379e16ee',
  'private': ''
};

export class DragonDex {
  public static FEE_DENOM = 10000n;
  public static REWARDS_DECIMALS = BigInt('100000000000');
  public static FEE_DEMON = BigInt('10000');

  private _provider = new Blockchain();

  public zilpay = new ZilPayBase();

  public get lp() {
    return $dex.state.lp;
  }

  public get fee() {
    return $dex.state.fee;
  }

  public get protoFee() {
    return $dex.state.protoFee;
  }

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
    const fee_bp = Number(DragonDex.FEE_DENOM - this.fee); // e.g. 30
    return (fee_bp / 100); // e.g. 0.3%
  }

  public async updateState() {
    const contract = toHex(this.contract);
    const owner = String(this.wallet?.base16).toLowerCase();
    const {
      pools,
      balances,
      totalContributions,
    } = await this._provider.fetchFullState(contract, owner);
    const shares = this._getShares(balances, totalContributions, owner);
    const dexPools = this._getPools(pools);

    updateDexBalances(balances);
    updateLiquidity(shares, dexPools);
  }

  public async updateTokens() {
    const owner = String($wallet.state?.base16);
    if (!owner || owner === 'undefined') return;
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

  public getRealPrice(pair: SwapPair[]): string {
    const [exactToken, limitToken] = pair;
    if (!exactToken.value || Number(exactToken.value) <= 0) {
      return '0';
    }

    const exact = this._valueToBigInt(exactToken.value, exactToken.meta);
    let value = 0n;
    
    try {
      const direction = this.getDirection(pair);
      switch (direction) {
        case SwapDirection.ZilToToken: {
          const pool = this.pools[limitToken.meta.base16];
          if (!pool) return '0';
          value = this._outputFor(exact, BigInt(pool[0]), BigInt(pool[1]));
          break;
        }
        case SwapDirection.TokenToZil: {
          const pool = this.pools[exactToken.meta.base16];
          if (!pool) return '0';
          value = this._outputFor(exact, BigInt(pool[1]), BigInt(pool[0]));
          break;
        }
        case SwapDirection.TokenToTokens: {
          const inputPool = this.pools[exactToken.meta.base16];
          const outputPool = this.pools[limitToken.meta.base16];
          if (!inputPool || !outputPool) return '0';
          
          const zilIntermediate = this._outputFor(exact, BigInt(inputPool[1]), BigInt(inputPool[0]));
          value = this._outputFor(zilIntermediate, BigInt(outputPool[0]), BigInt(outputPool[1]));
          break;
        }
      }
    } catch (err) {
        console.error("Price calculation error:", err);
        return '0';
    }
    
    return Big(value.toString()).div(this.toDecimails(limitToken.meta.decimals)).toFixed();
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

  public tokensToZil(value: string | Big, token: TokenState): Big {
    const amount = Big(value);

    try {
      const pool = this.pools[token.base16];
      if (!pool) {
        return Big(0);
      }

      const decimals = this.toDecimails(token.decimals);
      const zilDecimails = this.toDecimails(this.tokens[0].meta.decimals);
    
      const qa = amount.mul(decimals).round();

      const zilReserve = BigInt(pool[0]);
      const tokenReserve = BigInt(pool[1]);

      const zils = this._outputFor(
        BigInt(qa.toString()), 
        tokenReserve,          
        zilReserve             
      );

      return Big(zils.toString()).div(zilDecimails);
    
    } catch (err) {
      console.error("tokensToZil calculation error:", err);
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
    const contractAddress = PROY_ZILSWAP;
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
        value: PROY_ZILSWAP
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

  public async addLiquidity(addr: string, amount: Big, limit: Big, created: boolean) {
    const contractAddress = this.contract;
    const { blocks } = $settings.state;
    const { blockNum, totalContributions, pool } = await this._provider.getBlockTotalContributions(
      contractAddress,
      addr
    );
    const maxExchangeRateChange = BigInt($settings.state.slippage * 100);
    const nextBlock = Big(blockNum).add(blocks);
    const maxTokenAmount = created ?
      BigInt(amount.toString()) * (DragonDex.FEE_DEMON + maxExchangeRateChange) / DragonDex.FEE_DEMON : BigInt(amount.toString());
    let minContribution = BigInt(0);

    if (created) {
      const zilAmount = BigInt(limit.toString());
      const zilReserve = Big(pool[0]);
      const totalContribution = BigInt(totalContributions);
      const numerator = totalContribution * zilAmount;
      const denominator = Big(String(DragonDex.FEE_DEMON + maxExchangeRateChange)).sqrt().mul(zilReserve).round();
      minContribution = numerator / BigInt(String(denominator));
    }

    const params = [
      {
        vname: 'token_address',
        type: 'ByStr20',
        value: addr
      },
      {
        vname: 'min_contribution_amount',
        type: 'Uint128',
        value: String(minContribution)
      },
      {
        vname: 'max_token_amount',
        type: 'Uint128',
        value: String(maxTokenAmount)
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
    }, '5060');

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
    const zilsAfterSlippage = this.afterSlippage(BigInt(String(minzil)));
    const tokensAfterSlippage = this.afterSlippage(BigInt(String(minzrc)));
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
        value: String(zilsAfterSlippage)
      },
      {
        vname: 'min_token_amount',
        type: 'Uint128',
        value: String(tokensAfterSlippage)
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
        return Big(4637);
      case SwapDirection.TokenToZil:
        return Big(5163);
      case SwapDirection.TokenToTokens:
        return Big(6183);
      default:
        return Big(7000);
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

  private _zilToTokens(amount: bigint, inputPool: string[]): bigint {
    const [zilReserve, tokenReserve] = inputPool;

    return this._outputFor(
    amount,                 
    BigInt(zilReserve),     
    BigInt(tokenReserve)    
    );
  }

  private _tokensToZil(amount: bigint, inputPool: string[], cashback: boolean) {
    const [zilReserve, tokenReserve] = inputPool;
    const zils = this._outputFor(amount, BigInt(tokenReserve), BigInt(zilReserve));

    return (this.protoFee === BigInt(0) || !cashback) ? zils : zils - (zils / this.protoFee);
  }

  private _tokensToTokens(amount: bigint, inputPool: string[], outputPool: string[], cashback: boolean) {
    const [inputZilReserve, inputTokenReserve] = inputPool;
    const [outputZilReserve, outputTokenReserve] = outputPool;
    const fee = DragonDex.FEE_DEMON - ((DragonDex.FEE_DEMON - this.fee) / BigInt(2));
    const zilIntermediateAmount = this._outputFor(
      amount,
      BigInt(inputTokenReserve),
      BigInt(inputZilReserve),
      fee
    );

    const zils = (this.protoFee === BigInt(0) || !cashback) ?
      zilIntermediateAmount : zilIntermediateAmount - (zilIntermediateAmount / this.protoFee);

    return this._outputFor(zils, BigInt(outputZilReserve), BigInt(outputTokenReserve), fee);
  }

  private _outputFor(exactAmount: bigint, inputReserve: bigint, outputReserve: bigint, fee: bigint = this.fee) {
    const exactAmountAfterFee = exactAmount * fee;
    const numerator = exactAmountAfterFee * outputReserve;
    const inputReserveAfterFee = inputReserve * DragonDex.FEE_DEMON;
    const denominator = inputReserveAfterFee + exactAmountAfterFee;

    return numerator / denominator;
  }

  private _getShares(balances: FiledBalances, totalContributions: FieldTotalContributions, owner: string): Share {
    const shares: Share = {};
    const _zero = BigInt(0);
    const userContributions = balances;

    for (const token in userContributions) {
      try {
        const contribution = BigInt(totalContributions[token]);
        const balance = BigInt(userContributions[token][owner.toLowerCase()]);

        if (balance === _zero) {
          continue;
        }

        shares[token] = (balance * SHARE_PERCENT) / contribution;
      } catch {
        ///        
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
