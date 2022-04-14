import type { DexPool, FieldTotalContributions, FiledBalances, FiledPools, Share } from '@/types/zilliqa';

import Big from 'big.js';

import { Blockchain } from './custom-fetch';
import { ZilPayBase } from './zilpay-base';

import { $tokens, addToken, updateTokens } from '@/store/tokens';

import { toHex } from '@/lib/to-hex';
import { formatNumber } from '@/filters/n-format';
import { addTransactions } from '@/store/transactions';
import { SHARE_PERCENT } from '@/config/conts';
import { $liquidity, updateDexBalances, updateLiquidity } from '@/store/shares';
import { $wallet } from '@/store/wallet';
import { StorageFields } from '@/config/storage-fields';
import { $settings } from '@/store/settings';


Big.PE = 999;

export enum ExactSide {
  ExactInput,
  ExactOutput
}

export enum SwapDirection {
  ZilToToken,
  TokenToZil,
  TokenToTokens
}

export class DragonDex {
  public static CONTRACT = '0x0864fefeced1ce66928c7214e2a781145b8f921f';
  public static REWARDS_DECIMALS = BigInt('100000000000');
  public static FEE_DEMON = BigInt('10000');

  private _provider = new Blockchain();

  public zilpay = new ZilPayBase();

  public lp = BigInt(0);
  public fee = [BigInt(10000), BigInt(10000)];

  public get pools() {
    return $liquidity.state.pools;
  }

  public get tokens() {
    return $tokens.state.tokens;
  }

  public async updateState() {
    const contract = toHex(DragonDex.CONTRACT);
    const { pools, balances, totalContributions } = await this._provider.fetchFullState(contract);
    const shares = this._getShares(balances, totalContributions);
    const dexPools = this._getPools(pools);

    updateDexBalances(balances);
    updateLiquidity(shares, dexPools);

    // const listedTokens = Object.keys(pools);

    try {
      const fromStorage = window.localStorage.getItem(StorageFields.Tokens);
    
      if (fromStorage) {
        $tokens.setState(JSON.parse(fromStorage));
      }
    } catch {
      ///
    }

    // if ($wallet.state?.base16) {
    //   const newTokens = await this._provider.fetchTokens(
    //     $wallet.state?.base16,
    //     listedTokens,
    //     $tokens.state.tokens
    //   );

    //   updateTokens(newTokens);
    // }
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
        decimals: meta.decimals
      },
      balance: balances
    });
  }

  public async getUserDexContributions(token: string, owner: string) {
    const contractAddress = DragonDex.CONTRACT;
    return await this._provider.getUserBlockTotalContributions(
      contractAddress,
      token,
      owner
    );
  }

  public calcAmount(amount: bigint, index: number, direction: SwapDirection) {
    const token = this.tokens[index].meta;
    const [zilReserve, tokenReserve] = this.pools[String(token.base16).toLowerCase()];
    const [zilFee, tokensFee] = this.fee;
    const exactSide = ExactSide.ExactInput;
    const calculated = this._amountFor(
      direction,
      exactSide,
      amount,
      BigInt(zilReserve),
      BigInt(tokenReserve)
    );
    const tokens = this._getFee(calculated, tokensFee);
    const zils = this._getFee(calculated, zilFee);

    return {
      tokens,
      zils
    }
  }

  public zilToTokens(value: string | Big, index: number): Big {
    const amount = Big(value);

    try {
      const decimals = this.toDecimails(this.tokens[index].meta.decimals);
      const zilDecimails = this.toDecimails(this.tokens[0].meta.decimals);
      const qa = amount.mul(zilDecimails).round().toString();
      const { tokens } = this.calcAmount(BigInt(qa), index, SwapDirection.ZilToToken);
  
      return Big(String(tokens)).div(decimals);
    } catch {
      return Big(0);
    }
  }

  public tokensToZil(value: string | Big, index: number) {
    const amount = Big(value);

    try {
      const decimals = this.toDecimails(this.tokens[index].meta.decimals);
      const zilDecimails = this.toDecimails(this.tokens[0].meta.decimals);
  
      const qa = amount.mul(decimals).round().toString();
      const { zils } = this.calcAmount(BigInt(qa), index, SwapDirection.TokenToZil);
  
      return Big(String(zils)).div(zilDecimails);
    } catch {
      return Big(0);
    }
  }

  public tokensToTokens(value: string | Big, index0: number, index1: number) {
    const amount = Big(value);

    if (amount.eq(0) || !this.tokens[index0] || !this.tokens[index1]) {
      return Big(0);
    }

    const decimals0 = this.toDecimails(this.tokens[index0].meta.decimals);
    const decimals1 = this.toDecimails(this.tokens[index1].meta.decimals);
    const qa0 = amount.mul(decimals0).round().toString();
    const { zils } = this.calcAmount(BigInt(qa0), index0, SwapDirection.TokenToZil);
    const { tokens } = this.calcAmount(zils, index1, SwapDirection.ZilToToken);

    return Big(String(tokens)).div(decimals1);
  }

  public async swapExactZILForTokens(zil: Big, max: Big, recipient: string, token: string) {
    const { blocks } = $settings.state;
    const { NumTxBlocks } = await this.zilpay.getBlockchainInfo();
    const nextBlock = Big(NumTxBlocks).add(blocks);
    const params = [
      {
        vname: 'token_address',
        type: 'ByStr20',
        value: token
      },
      {
        vname: 'min_token_amount',
        type: 'Uint128',
        value: String(max)
      },
      {
        vname: 'deadline_block',
        type: 'BNum',
        value: String(nextBlock)
      },
      {
        vname: 'recipient_address',
        type: 'ByStr20',
        value: recipient
      }
    ];
    const contractAddress = DragonDex.CONTRACT;
    const transition = 'SwapExactZILForTokens';
    const res = await this.zilpay.call({
      params,
      contractAddress,
      transition,
      amount: String(zil)
    });

    const found = this.tokens.find((p) => p.meta.base16 === token);
    if (found) {
      const amount = zil.div(this.toDecimails(this.tokens[0].meta.decimals));
      addTransactions({
        timestamp: new Date().getTime(),
        name: `Swap ${formatNumber(String(amount))} ZIL to ${found.meta.symbol}`,
        confirmed: false,
        hash: res.ID,
        from: res.from
      });
    }

    return res;
  }

  public async swapExactTokensForZIL(tokens: Big, max: Big, recipient: string, token: string) {
    const { blocks } = $settings.state;
    const { NumTxBlocks } = await this.zilpay.getBlockchainInfo();
    const nextBlock = Big(NumTxBlocks).add(blocks);
    const params = [
      {
        vname: 'token_address',
        type: 'ByStr20',
        value: token
      },
      {
        vname: 'token_amount',
        type: 'Uint128',
        value: String(tokens)
      },
      {
        vname: 'min_zil_amount',
        type: 'Uint128',
        value: String(max)
      },
      {
        vname: 'deadline_block',
        type: 'BNum',
        value: String(nextBlock)
      },
      {
        vname: 'recipient_address',
        type: 'ByStr20',
        value: recipient
      }
    ];
    const contractAddress = DragonDex.CONTRACT;
    const transition = 'SwapExactTokensForZIL';
    const res = await this.zilpay.call({
      params,
      contractAddress,
      transition,
      amount: '0'
    });

    const foundIndex = this.tokens.findIndex((p) => p.meta.base16 === token);
    if (foundIndex >= 0) {
      const tokenMeta = this.tokens[foundIndex].meta;
      const amount = tokens.div(this.toDecimails(tokenMeta.decimals));
      addTransactions({
        timestamp: new Date().getTime(),
        name: `Swap ${formatNumber(String(amount))} ${tokenMeta.symbol} to ZIL`,
        confirmed: false,
        hash: res.ID,
        from: res.from
      });
    }

    return res;
  }

  public async swapExactTokensForTokens(tokens: Big, max: Big, recipient: string, token0: string, token1: string) {
    const contractAddress = DragonDex.CONTRACT;
    const { blocks } = $settings.state;
    const { NumTxBlocks } = await this.zilpay.getBlockchainInfo();
    const nextBlock = Big(NumTxBlocks).add(blocks);
    const params = [
      {
        vname: 'token0_address',
        type: 'ByStr20',
        value: token0
      },
      {
        vname: 'token1_address',
        type: 'ByStr20',
        value: token1
      },
      {
        vname: 'token0_amount',
        type: 'Uint128',
        value: String(tokens)
      },
      {
        vname: 'min_token1_amount',
        type: 'Uint128',
        value: String(max)
      },
      {
        vname: 'deadline_block',
        type: 'BNum',
        value: String(nextBlock)
      },
      {
        vname: 'recipient_address',
        type: 'ByStr20',
        value: recipient
      }
    ];
    const transition = 'SwapExactTokensForTokens';
    const res = await this.zilpay.call({
      params,
      contractAddress,
      transition,
      amount: '0'
    });
    const foundIndex0 = this.tokens.findIndex((p) => p.meta.base16 === token0);
    const foundIndex1 = this.tokens.findIndex((p) => p.meta.base16 === token1);

    if (foundIndex0 >= 0 && foundIndex1 >= 0) {
      const tokenMeta0 = this.tokens[foundIndex0].meta;
      const tokenMeta1 = this.tokens[foundIndex1].meta;
      const amount = tokens.div(this.toDecimails(tokenMeta0.decimals));
      addTransactions({
        timestamp: new Date().getTime(),
        name: `Swap ${formatNumber(String(amount))} ${tokenMeta0.symbol} to ${tokenMeta1.symbol}`,
        confirmed: false,
        hash: res.ID,
        from: res.from
      });
    }

    return res;
  }

  public async addLiquidity(addr: string, amount: Big, limit: Big) {
    const contractAddress = DragonDex.CONTRACT;
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
    const params = [
      {
        vname: 'token_address',
        type: 'ByStr20',
        value: addr
      },
      {
        vname: 'min_contribution_amount',
        type: 'Uint128',
        value: String(minContributionAmount)
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
    });
    addTransactions({
      timestamp: new Date().getTime(),
      name: `addLiquidity`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return res.ID;
  }

  public async removeLiquidity(minzil: Big, minzrc: Big, minContributionAmount: Big, token: string, owner: string) {
    const contractAddress = DragonDex.CONTRACT;
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
    });

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

  private _outputFor(inputAmount: bigint, inputReserve: bigint, outputReserve: bigint) {
    const numerator = inputAmount * outputReserve;
    const denominator = inputReserve + inputAmount;
    return numerator / denominator;
  }

  private _inputFor(outputAmount: bigint, inputReserve: bigint, outputReserve: bigint) {
    const numerator = inputReserve * outputAmount;
    const denominator = outputReserve - outputAmount;
    return numerator / denominator;
  }

  private _calcAmount(exact: ExactSide) {
    switch (exact) {
      case ExactSide.ExactInput:
        return this._outputFor;
      case ExactSide.ExactOutput:
        return this._inputFor;
      default:
        throw new Error("Incorect ExactSide");
    }
  }

  private _amountFor(
    direction: SwapDirection,
    exactSide: ExactSide,
    exactAmount: bigint,
    zilReserve: bigint,
    tokenReserve: bigint
  ) {
    switch (direction) {
      case SwapDirection.ZilToToken:
        return this._calcAmount(exactSide)(exactAmount, zilReserve, tokenReserve);
      case SwapDirection.TokenToZil:
        return this._calcAmount(exactSide)(exactAmount, tokenReserve, zilReserve);
      default:
        throw new Error("Incorect SwapDirection");
    }
  }

  private _fraction(d: bigint, x: bigint, y: bigint) {
    return (d * y) / x;
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

      newPools[token] = [BigInt(x), BigInt(y)];
    }

    return newPools;
  }

  private _getFee(value: bigint, fee: bigint) {
    return value * fee / DragonDex.FEE_DEMON;
  }
}
