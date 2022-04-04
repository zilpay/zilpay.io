export interface TokenState {
  decimals: number;
  bech32: string;
  base16: string;
  name: string;
  symbol: string;
}

export interface Pool {
  balance: {
    [owner: string]: bigint;
  };
  meta: TokenState;
}

export interface ParamItem {
  type: string;
  value: string | unknown[];
  vname: string;
}
