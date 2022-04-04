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
