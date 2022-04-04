import type { FieldTotalContributions, FiledBalances, FiledPools, RPCResponse } from "@/types/zilliqa";

import { compact } from "@/lib/compact";
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
  MinLP = 'min_lp',
  Balances = 'balances',
  TotalContributions = 'total_contributions'
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

  public async fetchFullState(dex: string) {
    const batch = [
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.Balances, []]
      ),
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.TotalContributions, []]
      ),
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.Pools, []]
      )
    ];
    const [resBalances, resTotalContributions, resPools] = await this._send(batch);
    const balances: FiledBalances = resBalances.result[DexFields.Balances];
    const totalContributions: FieldTotalContributions = resTotalContributions.result[DexFields.TotalContributions];
    const pools: FiledPools = resPools.result[DexFields.Pools];

    return {
      balances,
      totalContributions,
      pools
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
