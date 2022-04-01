export interface TokenState {
  decimals: number;
  bech32: string;
  base16: string;
  name: string;
  symbol: string;
}

export interface Pool {
  pool: Array<bigint>;
  balance: {
    [owner: string]: bigint;
  };
  meta: TokenState;
}
