import type { ListedTokenResponse } from "@/types/token";

export enum BackendMethods {
  Tokens = `tokens`,
  Rate = 'rates',
  Listed = 'dex/tokens'
}

export class ZilPayBackend {
  private _host = typeof window !== 'undefined' ?
    'https://api.zilpay.io' : `http://127.0.0.1:3000`;
  private _api = `api/v1`;

  public async getListedTokens(): Promise<ListedTokenResponse> {
    try {
      const url = new URL(
        `${this._host}/${this._api}/${BackendMethods.Listed}`,
      );
      const res = await fetch(url.toString());
  
      if (res.status !== 200) {
        return {
          list: [],
          count: 0
        };
      }
  
      const result = await res.json();
  
      return result;
    } catch {
      return {
        list: [],
        count: 0
      };
    }
  }

  public async getRate() {
    try {
      const url = new URL(
        `${this._host}/${this._api}/${BackendMethods.Rate}?currency=usd`,
      );
      const res = await fetch(url.toString());
  
      if (res.status !== 200) {
        return 0;
      }
  
      const result = await res.json();
  
      return result.usd;
    } catch {
      return 0;
    }
  }
}
