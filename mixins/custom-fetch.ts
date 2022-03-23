import { initParser } from "@/lib/parse-init";
import { toHex } from "@/lib/to-hex";

export enum RPCMethods {
  GetSmartContractSubState = 'GetSmartContractSubState',
  GetTransaction = 'GetTransaction',
  GetSmartContractInit = 'GetSmartContractInit',
  GetBalance = 'GetBalance'
}

export class Blockchain {
  private _http = `https://zilliqa-isolated-server.zilliqa.com`;

  public async getTransaction(...hash: string[]) {
    const batch = hash.map((hash) => ({
      method: RPCMethods.GetTransaction,
      params: [hash],
      id: 1,
      jsonrpc: `2.0`,
    }));
    return this._send(batch);
  }

  public async fetchDexState(contrat: string, token: string, owner: string) {
    const poolsFiled = 'pools';
    const feeFiled = 'swap_fee';
    const minLPField = 'min_lp';
    const balancesField = 'balances';

    const batch = [
      {
        method: RPCMethods.GetSmartContractSubState,
        params: [
          contrat,
          poolsFiled,
          [token]
        ],
        id: 1,
        jsonrpc: `2.0`,
      },
      {
        method: RPCMethods.GetSmartContractSubState,
        params: [
          contrat,
          feeFiled,
          []
        ],
        id: 1,
        jsonrpc: `2.0`,
      },
      {
        method: RPCMethods.GetSmartContractSubState,
        params: [
          contrat,
          minLPField,
          []
        ],
        id: 1,
        jsonrpc: `2.0`,
      },
      {
        method: RPCMethods.GetSmartContractSubState,
        params: [
          toHex(token),
          balancesField,
          [owner]
        ],
        id: 1,
        jsonrpc: `2.0`,
      },
      {
        method: RPCMethods.GetSmartContractInit,
        params: [
          toHex(token)
        ],
        id: 1,
        jsonrpc: `2.0`,
      },
      {
        method: RPCMethods.GetBalance,
        params: [
          toHex(owner)
        ],
        id: 1,
        jsonrpc: `2.0`,
      },
    ];
    const [pool, fee, minLPRes, balances, resInit, zilBalance] = await this._send(batch);
    const [zilReserve, tokenReserve] = pool.result[poolsFiled][token].arguments;
    const [zilFee, tokensFee] = fee.result[feeFiled].arguments;
    const minLP = minLPRes.result[minLPField];
    const balance = balances.result ? balances.result[balancesField][owner] : 0;
    const init = initParser(resInit.result);
    const balancesZIL = zilBalance.error ? BigInt(0) : BigInt(zilBalance.result.balance);

    return {
      balancesZIL,
      fee: [BigInt(zilFee), BigInt(tokensFee)],
      pool: [BigInt(zilReserve), BigInt(tokenReserve)],
      lp: BigInt(minLP),
      balance: BigInt(balance),
      init
    };
  }

  private async _send(batch: object[]) {
    const res = await fetch(this._http, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(batch),
    });
    return res.json();
  }
}
