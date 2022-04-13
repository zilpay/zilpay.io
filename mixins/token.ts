import { addTransactions } from "@/store/transactions";
import { Blockchain } from "./custom-fetch";
import { ZilPayBase } from "./zilpay-base";

export class tokensMixine {
  private _provider = new Blockchain();

  public zilpay = new ZilPayBase();

  public isAllow(value: string, allowances: string) {
    const bigValue = BigInt(value);
    const bigAllow = BigInt(allowances);

    return bigValue < bigAllow;
  }

  public async getAllowances(spender: string, contract: string): Promise<bigint> {
    const field = `allowances`;
    const zilpay = await this.zilpay.zilpay();
    const owner = String(zilpay.wallet.defaultAccount?.base16).toLowerCase();
    const address = spender.toLowerCase();
    const result = await this.zilpay.getSubState(contract, field, [
      owner,
      address
    ]);

    if (result && result[owner] && result[owner][address]) {
      return BigInt(result[owner][address]);
    }

    return BigInt(0);
  }

  public async increaseAllowance(spender: string, token: string, balance: string) {
    const params = [
      {
        vname: `spender`,
        type: `ByStr20`,
        value: String(spender),
      },
      {
        vname: `amount`,
        type: `Uint128`,
        value: String(balance),
      },
    ];
    const transition = `IncreaseAllowance`;
    const res = await this.zilpay.call({
      transition,
      params,
      amount: `0`,
      contractAddress: token
    });

    addTransactions({
      timestamp: new Date().getTime(),
      name: `Approve token`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return res;
  }
}
