export interface RPCResponse {
  id: number;
  jsonrpc: string;
  result?: any;
  error?: {
    code: number;
    data: unknown;
    message: string;
  };
};

export interface Tx {
  hash: string;
  name: string;
  from: string;
  timestamp: number;
  confirmed: boolean;
  error?: boolean;
}

export interface FiledBalances {
  [token: string]: {
    [owner: string]: string;
  }
}

export interface Share {
  [token: string]: bigint;
}


export interface DexPool {
  [token: string]: string[];
}

export interface FiledPools {
  [token: string]: {
    argtypes: string[];
    arguments: string[];
    constructor: "Pair";
  }
}

export interface FieldTotalContributions {
  [token: string]: string;
}
