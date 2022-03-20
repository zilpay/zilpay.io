import { toHex } from '@/lib/to-hex';
import { Blockchain } from './custom-fetch';

enum ExactSide {
  ExactInput,
  ExactOutput
}

enum SwapDirection {
  ZilToToken,
  TokenToZil
}

export interface TokenState {
  pool: Array<bigint>;
  decimals: number;
  balance: {
    [owner: string]: bigint;
  };
}

export class DragonDex {
  public static CONTRACT = '0xe849b9bf534c99b85e09a0241b3581022f76b9e6';
  public static REWARDS_DECIMALS = BigInt('100000000000');
  public static FEE_DEMON = BigInt('10000');

  private _provider = new Blockchain();

  public lp = BigInt(0);
  public fee = [BigInt(0), BigInt(0)];
  public pools: {
    [token: string]: TokenState
  } = {};

  public async updateState(token: string, owner: string) {
    const contract = toHex(DragonDex.CONTRACT);
    const { pool, fee, lp, balance, init } = await this._provider.fetchDexState(contract, token, owner);

    this.lp = lp;
    this.pools[token] = {
      pool,
      balance: {
        [owner]: balance
      },
      decimals: init.decimals
    };
    this.fee = fee;

    // const amount = this.calcAmount(BigInt(9000000000), token, SwapDirection.TokenToZil);
    // console.log(amount);
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