import type { ListedTokenResponse } from "@/types/token";

export enum BackendMethods {
  Tokens = `tokens`,
  Rate = 'rates',
  Listed = 'dex/tokens'
}

export class ZilPayBackend {
  private _host = `http://127.0.0.1:3000`;
  private _api = `api/v1`;

  public async getListedTokens(): Promise<ListedTokenResponse> {
    let url = new URL(
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
  }

  public async getRate() {
    let url = new URL(
      `${this._host}/${this._api}/${BackendMethods.Rate}?currency=usd`,
    );
    const res = await fetch(url.toString());

    if (res.status !== 200) {
      throw new Error(String(res.status));
    }

    const result = await res.json();

    return result.data;
  }
}
