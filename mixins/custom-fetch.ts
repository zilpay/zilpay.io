import type { FieldTotalContributions, FiledBalances, FiledPools, RPCResponse } from "@/types/zilliqa";

import { compact } from "@/lib/compact";
import { toHex } from "@/lib/to-hex";
import { chunk } from "@/lib/chunk";
import { initParser } from "@/lib/parse-init";
import { Token } from "@/types/token";
import { ZilPayBase } from "./zilpay-base";
import { ZERO_ADDR } from "@/config/conts";

import { $net } from '@/store/netwrok';

type Params = string[] | number[] | (string | string[] | number[])[];

export enum RPCMethods {
  GetSmartContractSubState = 'GetSmartContractSubState',
  GetTransaction = 'GetTransaction',
  GetSmartContractInit = 'GetSmartContractInit',
  GetBalance = 'GetBalance',
  GetLatestTxBlock = 'GetLatestTxBlock'
}

export enum DexFields {
  Pools = 'pools',
  LiquidityFee = 'liquidity_fee',
  ProtocolFee = 'protocol_fee',
  RewardsPool = 'rewards_pool',
  MinLP = 'min_lp',
  Balances = 'balances',
  TotalContributions = 'total_contributions'
}

export enum ZRC2Fields {
  Balances = 'balances'
}

export class Blockchain {
  private _http = {
    "mainnet": `https://api.zilliqa.com`,
    "testnet": "`https://dev-api.zilliqa.com`"
  };
  readonly #rpc = {
    id: 1,
    jsonrpc: '2.0'
  };

  public get http() {
    const net = $net.state.net as 'mainnet' | 'testnet';
    return this._http[net];
  }

  public async getTransaction(...hash: string[]) {
    const batch = hash.map((hash) => ({
      method: RPCMethods.GetTransaction,
      params: [hash],
      id: 1,
      jsonrpc: `2.0`,
    }));
    return this._send(batch);
  }

  public async getUserBlockTotalContributions(dex: string, token: string, owner: string) {
    token = token.toLowerCase();
    owner = owner.toLowerCase();
    dex = toHex(dex);
    const batch = [
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.Balances, [token, owner]]
      ),
      this._buildBody(
        RPCMethods.GetLatestTxBlock,
        []
      ),
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.Pools, [token]]
      )
    ];
    const [resUserContributions, resBlock, resPool] = await this._send(batch);
    const userContributions = resUserContributions.result && resUserContributions.result[DexFields.Balances] ?
      resUserContributions.result[DexFields.Balances][token][owner] : '0';
    const blockNum = resBlock.result.header.BlockNum;
    const pool = resPool.result[DexFields.Pools][token].arguments;

    return {
      userContributions,
      blockNum,
      pool
    };
  }

  public async getBlockTotalContributions(dex: string, token: string) {
    token = token.toLowerCase();
    dex = toHex(dex);
    const batch = [
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.TotalContributions, [token]]
      ),
      this._buildBody(
        RPCMethods.GetLatestTxBlock,
        []
      ),
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.Pools, [token]]
      )
    ];
    const [resTotalContributions, resBlock, resPool] = await this._send(batch);
    const totalContributions = resTotalContributions.result ?
      resTotalContributions.result[DexFields.TotalContributions][token] : '0';
    const blockNum = resBlock.result.header.BlockNum;
    const pool = resPool.result ?
      resPool.result[DexFields.Pools][token].arguments : ['0', '0'];

    return {
      totalContributions,
      blockNum,
      pool
    };
  }

  public async fetchFullState(dex: string, owner: string) {
    const batch = [
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.Balances, [owner]]
      ),
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.TotalContributions, []]
      ),
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.Pools, []]
      ),
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.LiquidityFee, []]
      ),
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.ProtocolFee, []]
      ),
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [dex, DexFields.RewardsPool, []]
      )
    ];
    const [resBalances, resTotalContributions, resPools, resLiquidityFee, resProtocolFee, resRewardsPool] = await this._send(batch);
    const balances: FiledBalances = resBalances.result ? resBalances.result[DexFields.Balances] : {};
    const totalContributions: FieldTotalContributions = resTotalContributions.result ?
      resTotalContributions.result[DexFields.TotalContributions] : {};
    const pools: FiledPools = resPools.result ? resPools.result[DexFields.Pools] : {};
    const liquidityFee = resLiquidityFee.result ? resLiquidityFee.result[DexFields.LiquidityFee] : '0';
    const protocolFee = resProtocolFee.result ? resProtocolFee.result[DexFields.ProtocolFee] : '0';
    const rewardsPool = resRewardsPool.result ? resRewardsPool.result[DexFields.RewardsPool] : ZERO_ADDR;

    return {
      balances,
      totalContributions,
      pools,
      liquidityFee,
      protocolFee,
      rewardsPool
    };
  }

  public async getToken(token: string, owner: string) {
    owner = owner.toLowerCase();

    const batch = [
      this._buildBody(
        RPCMethods.GetSmartContractInit,
        [toHex(token)]
      ),
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [toHex(token), ZRC2Fields.Balances, [owner]]
      )
    ];
    const [resInit, resBalances] = await this._send(batch);
    const meta = initParser(resInit.result);
    const balances = resBalances.result ?
      resBalances.result[ZRC2Fields.Balances] : {};


    return {
      meta,
      balances
    };
  }

  public async fetchTokensBalances(owner: string, tokens: Token[]) {
    owner = owner.toLowerCase();

    const reqList = tokens.slice(1).map((token) => this._buildBody(
      RPCMethods.GetSmartContractSubState,
      [toHex(token.meta.base16), ZRC2Fields.Balances, [owner.toLowerCase()]]
    ));
    const batch = [
      this._buildBody(
        RPCMethods.GetBalance,
        [toHex(owner)]
      ),
      ...reqList
    ];
    const batchRes = await this._send(batch);
    
    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index];

      if (token.meta.base16 === ZERO_ADDR) {
        tokens[index].balance[owner] = batchRes[index].result ?
          batchRes[index].result.balance : '0';
        continue;
      }

      tokens[index].balance[owner] = batchRes[index].result ?
        batchRes[index].result[ZRC2Fields.Balances][owner] : '0';
    }

    return tokens;
  }

  public async fetchTokens(owner: string, tokens: string[], pools: Token[]) {
    const reqList = tokens.map((token) => ([
      this._buildBody(
        RPCMethods.GetSmartContractInit,
        [toHex(token)]
      ),
      this._buildBody(
        RPCMethods.GetSmartContractSubState,
        [toHex(token), ZRC2Fields.Balances, [owner.toLowerCase()]]
      )
    ]));
    const tokensBatch = compact(reqList);
    const batch = [
      {
        method: RPCMethods.GetBalance,
        params: [
          toHex(owner)
        ],
        id: 1,
        jsonrpc: `2.0`,
      },
      ...tokensBatch
    ];
    const batchRes = await this._send(batch);
    const tokensRes = batchRes.slice(1);
    const chunks = chunk<RPCResponse>(tokensRes, 2);
    const zp = await new ZilPayBase().zilpay();

    for (const iterator of chunks) {
      const [init, balancesRes] = iterator;
      const meta = initParser(init.result);
      const balances = balancesRes.result ? balancesRes.result[ZRC2Fields.Balances] : {};
      const foundIndex = pools.findIndex((t) => t.meta.base16 === meta.address);

      if (foundIndex >= 0) {
        pools[foundIndex].meta = {
          decimals: meta.decimals,
          scope: 0,
          bech32: zp.crypto.toBech32Address(meta.address),
          base16: meta.address,
          name: meta.name,
          symbol: meta.symbol
        };
        pools[foundIndex].balance = {
          ...pools[foundIndex].balance,
          ...balances
        };
      } else {
        pools.push({
          meta: {
            decimals: meta.decimals,
            bech32: zp.crypto.toBech32Address(meta.address),
            base16: meta.address,
            scope: 0,
            name: meta.name,
            symbol: meta.symbol
          },
          balance: balances
        });
      }
    }

    if (batchRes[0].result) {
      pools[0].balance = {
        ...pools[0].balance,
        [owner.toLowerCase()]: batchRes[0].result.balance
      };
    } else {
      pools[0].balance = {
        ...pools[0].balance,
        [owner.toLowerCase()]: '0'
      };
    }

    return pools;
  }


  private _buildBody(method: string, params: Params) {
    return {
      ...this.#rpc,
      method,
      params
    };
  }

  private async _send(batch: object[]): Promise<RPCResponse[]> {
    const res = await fetch(this.http, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(batch),
    });
    return res.json();
  }
}
