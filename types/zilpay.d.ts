export interface ZIlliqaResponse {
  id: number;
  jsonrpc: string;
  req: {
    url: string;
    payload: {
      id: number;
      jsonrpc: string;
      method: string;
      params: string[];
    };
  };
  result: any | null;
  error?: string;
}

export interface ZilPayType {
  ERRORS: {
    CONNECT: string;
    CONTRACT_HASN_TDEPLOYED: string;
    DISABLED: string;
    DISABLE_DMETHOD: string;
    INIT_PARAMS: string;
    MUST_BE_OBJECT: string;
    MUST_BE_STRING: string;
    REQUIRED: string;
  };
  wallet: {
    defaultAccount: {
      base16: string;
      bech32: string;
    };
    isConnect: boolean;
    isEnable: boolean;
    net: 'testnet' | 'mainnet';
    observableTransaction: any;
    observableAccount: any;
    connect: () => Promise<boolean>;
  };
  blockchain: {
    getBalance: (address: string) => Promise<ZIlliqaResponse>;
    getSmartContractState: (address: string) => Promise<ZIlliqaResponse>;
    getSmartContractSubState: (address: string, field: string, params: string[]) => Promise<ZIlliqaResponse>;
    getBlockChainInfo: () => Promise<ZIlliqaResponse>;
  };
  crypto: {
    fromBech32Address: (address: string) => string;
    isValidChecksumAddress: (address: string) => boolean;
  };
  contracts: any;
  utils: any;
}
