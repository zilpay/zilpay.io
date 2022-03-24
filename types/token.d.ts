
export interface ParamItem {
  type: string;
  value: string | unknown[];
  vname: string;
}

export interface TokenState {
  decimals: number;
  bech32: string;
  base16: string;
  name: string;
  symbol: string;
}

export interface ListedTokensState extends TokenState {
  pool: Array<bigint>;
  balance: {
    [owner: string]: bigint;
  };
}

export interface Pool {
  pool: Array<bigint>;
  balance: {
    [owner: string]: bigint;
  };
  meta: TokenState;
}

export interface PoolsState {
  [addr: string]: Pool;
}