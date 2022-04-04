import type { RPCResponse } from "@/types/zilliqa";

import { compact } from "@/lib/compact";
import { initParser } from "@/lib/parse-init";
import { toHex } from "@/lib/to-hex";
import { chunk } from "@/lib/chunk";
import { ZERO_ADDR } from "@/config/conts";

type Params = string[] | number[] | (string | string[] | number[])[];

export enum RPCMethods {
  GetSmartContractSubState = 'GetSmartContractSubState',
  GetTransaction = 'GetTransaction',
  GetSmartContractInit = 'GetSmartContractInit',
  GetBalance = 'GetBalance'
}

export enum DexFields {
  Pools = 'pools',
  Fee = 'swap_fee',
  MinLP = 'min_lp'
}

export enum ZRC2Fields {
  Balances = 'balances'
}

const EMPTY_FEE = {
  "argtypes": [
      "Uint256",
      "Uint256"
  ],
  "arguments": [
      "10000",
      "10000"
  ],
  "constructor": "Pair"
};

export class Blockchain {
  private _http = `https://zilliqa-isolated-server.zilliqa.com`;
  readonly #rpc = {
    id: 1,
    jsonrpc: '2.0'
  };

  public async getTransaction(...hash: string[]) {
    const batch = hash.map((hash) => ({
      method: RPCMethods.GetTransaction,
      params: [hash],
      id: 1,
      jsonrpc: `2.0`,
    }));
    return this._send(batch);
  }

  public async fetchPoolsBalances(dex: string, owner: string, list: string[]) {
    const tokens = list.slice(1).map((token) => ([
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.Pools, [token]]
      ),
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [toHex(token), ZRC2Fields.Balances, [owner.toLowerCase()]]
      )
    ]));
    const tokensBatch = compact(tokens);
    const batch = [
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.Fee, []]
      ),
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.MinLP, []]
      ),
      {
        method: RPCMethods.GetBalance,
        params: [
          toHex(owner)
        ],
        id: 1,
        jsonrpc: `2.0`,
      },
      ...tokensBatch,
    ];
    const batchRes = await this._send(batch);
    const [resFee, minLPRes, zilsRes] = batchRes.slice(0, 3);
    const tokensRes = batchRes.slice(3);
    const [zilFee, tokensFee] = this._unpack(resFee, DexFields.Fee, EMPTY_FEE).arguments;
    const minLP = this._unpack(minLPRes, DexFields.MinLP, '0');
    const zilBalance = this._unpack(zilsRes, 'balance', '0');
    const chunks = chunk<RPCResponse>(tokensRes, 2);
    const state: {
      [key: string]: {
        balance: bigint;
        pool: Array<bigint>;
      }
    } = {};

    for (let index = 0; index < list.length; index++) {
      const token = list[index];

      state[token] = {
        balance: BigInt(0),
        pool: [BigInt(0), BigInt(0)]
      }

      if (token === ZERO_ADDR) {
        state[token] = {
          balance: BigInt(zilBalance),
          pool: [BigInt(0), BigInt(0)]
        };
        continue;
      }

      const chunk = chunks[index - 1];

      if (chunk[0] && chunk[0].result && chunk[0].result[DexFields.Pools]) {
        const [zilReserve, tokensReserve] = chunk[0].result[DexFields.Pools][token].arguments;

        state[token]['pool'] = [BigInt(zilReserve), BigInt(tokensReserve)];
      }

      if (chunk[1] && chunk[1].result && chunk[1].result[ZRC2Fields.Balances]) {
        const zils = chunk[1].result[ZRC2Fields.Balances][owner.toLowerCase()];
        state[token].balance = BigInt(zils);
      } else {
        state[token].balance = BigInt(0);
      }
    }

    return {
      state,
      fee: [BigInt(zilFee), BigInt(tokensFee)],
      minLP: minLP
    };
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

  private _unpack<T>(res: RPCResponse, field: string, defaultValue: T) {
    if (res.error || !res.result) {
      return defaultValue;
    }

    if (res.result && res.result[field]) {
      return res.result[field];
    }

    return defaultValue;
  }

  private _buildBody(method: string, params: Params) {
    return {
      ...this.#rpc,
      method,
      params
    };
  }

  private async _send(batch: object[]): Promise<RPCResponse[]> {
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
