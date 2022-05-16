export interface TokenState {
  decimals: number;
  bech32: string;
  base16: string;
  name: string;
  symbol: string;
  scope: number;
}

export interface Token {
  balance: {
    [owner: string]: string;
  };
  meta: TokenState;
}

export interface ParamItem {
  type: string;
  value: string | unknown[];
  vname: string;
}

export interface ListedTokenResponse {
  tokens: {
    list: TokenState[];
    count: number;
  };
  pools: {
    [token: string]: string[];
  };
  rate: number;
}
