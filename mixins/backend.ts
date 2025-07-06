import type { ListedTokenResponse } from "@/types/token";

export enum BackendMethods {
  Tokens = `tokens`,
  Rate = 'rates',
  Dex = 'dex'
}

export class ZilPayBackend {
  // private _host = 'https://api.zilpay.io';
  // private _host = 'http://127.0.0.1:3000';
  private _host = typeof window !== 'undefined' ?
    'https://api.zilpay.io' : `http://127.0.0.1:4000`;
  private _api = `api/v1`;

  public async getListedTokens(): Promise<ListedTokenResponse> {
    try {
      const url = new URL(
        `${this._host}/${this._api}/${BackendMethods.Dex}`,
      );
      const res = await fetch(url.toString());

      if (res.status !== 200) {
        return {
          tokens: {
            list: [],
            count: 0
          },
          rate: 0,
          pools: {}
        };
      }

      const result = await res.json();

      return result;
    } catch (err) {
      console.error('getListedTokens', err);
      return {
        tokens: {
          list: [],
          count: 0
        },
        rate: 0,
        pools: {}
      };
    }
  }
}
