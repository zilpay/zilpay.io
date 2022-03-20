import { ZilPayBase } from './zilpay-base';

export enum RPCMethods {
  GetSmartContractSubState = 'GetSmartContractSubState',
  GetTransaction = 'GetTransaction'
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

  public async fetchDexState(contrat: string, token: string) {
    const poolsFiled = 'pools';
    const feeFiled = 'swap_fee';
    const minLPField = 'min_lp';

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
      }
    ];
    const [pool, fee, minLPRes] = await this._send(batch);
    const [zilReserve, tokenReserve] = pool.result[poolsFiled][token].arguments;
    const [zilFee, tokensFee] = fee.result[feeFiled].arguments;
    const minLP = minLPRes.result[minLPField];

    return {
      fee: [BigInt(zilFee), BigInt(tokensFee)],
      pool: [BigInt(zilReserve), BigInt(tokenReserve)],
      lp: BigInt(minLP)
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
