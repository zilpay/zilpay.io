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
  list: {
    bech32: string;
    base16: string;
    decimals: number;
    name: string;
    symbol: string;
    scope: number;
  }[],
  count: number;
}
