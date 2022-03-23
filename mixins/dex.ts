import { ZERO_ADDR } from '@/config/conts';
import { toHex } from '@/lib/to-hex';
import Big from 'big.js';
import { Blockchain } from './custom-fetch';
import { ZilPayBase } from './zilpay-base';

Big.PE = 999;

export enum ExactSide {
  ExactInput,
  ExactOutput
}

export enum SwapDirection {
  ZilToToken,
  TokenToZil
}

export interface TokenState {
  pool: Array<bigint>;
  decimals: number;
  name: string;
  symbol: string;
  balance: {
    [owner: string]: bigint;
  };
}

export class DragonDex {
  public static CONTRACT = '0x34020700f887cee68e984177ecefff9b2f1574cd';
  public static REWARDS_DECIMALS = BigInt('100000000000');
  public static FEE_DEMON = BigInt('10000');

  private _provider = new Blockchain();

  public zilpay = new ZilPayBase();

  public lp = BigInt(0);
  public fee = [BigInt(0), BigInt(0)];
  public pools: {
    [token: string]: TokenState
  } = {};

  constructor() {
    this.pools[ZERO_ADDR] = {
      pool: [BigInt(0), BigInt(0)],
      decimals: 12,
      symbol: 'ZIL',
      name: 'Zilliqa',
      balance: {}
    };
  }

  public async updateState(token: string, owner: string) {
    const contract = toHex(DragonDex.CONTRACT);
    const {
      pool,
      fee,
      lp,
      balance,
      init,
      balancesZIL
    } = await this._provider.fetchDexState(contract, token, owner);

    this.lp = lp;
    this.pools[token] = {
      pool,
      balance: {
        [owner]: balance
      },
      decimals: init.decimals,
      symbol: init.symbol,
      name: init.name
    };
    this.fee = fee;
    this.pools[ZERO_ADDR].balance[owner] = balancesZIL;
  }

  public calcAmount(amount: bigint, token: string, direction: SwapDirection) {
    const [zilReserve, tokenReserve] = this.pools[token].pool;
    const [zilFee, tokensFee] = this.fee;
    const exactSide = ExactSide.ExactInput;
    const calculated = this._amountFor(
      direction,
      exactSide,
      amount,
      zilReserve,
      tokenReserve
    );
    const tokens = this._getFee(calculated, tokensFee);
    const zils = this._getFee(calculated, zilFee);

    return {
      tokens,
      zils
    }
  }

  public zilToTokens(value: string | Big, token: string): Big {
    const amount = Big(value);

    const decimals = this.toDecimails(this.pools[token].decimals);
    const zilDecimails = this.toDecimails(12);
    const qa = amount.mul(zilDecimails).round().toString();
    const { tokens } = this.calcAmount(BigInt(qa), token, SwapDirection.ZilToToken);

    return Big(String(tokens)).div(decimals);
  }

  public tokensToZil(value: string | Big, token: string) {
    const amount = Big(value);

    const decimals = this.toDecimails(this.pools[token].decimals);
    const zilDecimails = this.toDecimails(12);
    const qa = amount.mul(decimals).round().toString();
    const { zils } = this.calcAmount(BigInt(qa), token, SwapDirection.TokenToZil);

    return Big(String(zils)).div(zilDecimails);
  }

  public swapExactZILForTokens(zil: Big, max: Big, recipient: string, token: string) {
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
        value: String(4354343543543)
      },
      {
        vname: 'recipient_address',
        type: 'ByStr20',
        value: recipient
      }
    ];
    const contractAddress = DragonDex.CONTRACT;
    const transition = 'SwapExactZILForTokens';

    return this.zilpay.call({
      params,
      contractAddress,
      transition,
      amount: String(zil)
    });
  }

  public swapExactTokensForZIL(tokens: Big, max: Big, recipient: string, token: string) {
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
        value: String(4354343543543)
      },
      {
        vname: 'recipient_address',
        type: 'ByStr20',
        value: recipient
      }
    ];
    const contractAddress = DragonDex.CONTRACT;
    const transition = 'SwapExactTokensForZIL';

    return this.zilpay.call({
      params,
      contractAddress,
      transition,
      amount: '0'
    });
  }

  public swapExactTokensForTokens(tokens: Big, max: Big, recipient: string, token0: string, token1: string,) {
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
        value: String(4354343543543)
      },
      {
        vname: 'recipient_address',
        type: 'ByStr20',
        value: recipient
      }
    ];
    const contractAddress = DragonDex.CONTRACT;
    const transition = 'SwapExactTokensForTokens';

    return this.zilpay.call({
      params,
      contractAddress,
      transition,
      amount: '0'
    });
  }

  public addLiquidity(min: Big, max: Big, amount: Big, token: string) {
    const params = [
      {
        vname: 'token_address',
        type: 'ByStr20',
        value: token
      },
      {
        vname: 'min_contribution_amount',
        type: 'Uint128',
        value: String(min)
      },
      {
        vname: 'max_token_amount',
        type: 'Uint128',
        value: String(max)
      },
      {
        vname: 'deadline_block',
        type: 'BNum',
        value: String(max)
      }
    ];
    const contractAddress = DragonDex.CONTRACT;
    const transition = 'AddLiquidity';

    return this.zilpay.call({
      params,
      contractAddress,
      transition,
      amount: String(amount)
    });
  }

  public removeLiquidity(minzil: Big, minzrc: Big, contribution: Big, token: string) {
    const params = [
      {
        vname: 'token_address',
        type: 'ByStr20',
        value: token
      },
      {
        vname: 'contribution_amount',
        type: 'Uint128',
        value: String(contribution)
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
        value: String(contribution)
      }
    ];
    const contractAddress = DragonDex.CONTRACT;
    const transition = 'RemoveLiquidity';

    return this.zilpay.call({
      params,
      contractAddress,
      transition,
      amount: '0'
    });
  }

  public toDecimails(decimals: number) {
    return Big(10**decimals);
  }

  private _fraction(d: bigint, x: bigint, y: bigint) {
    return (d * y) / x;
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

  private _getFee(value: bigint, fee: bigint) {
    return value * fee / DragonDex.FEE_DEMON;
  }
}
