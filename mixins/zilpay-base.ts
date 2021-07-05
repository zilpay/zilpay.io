import { ZilPayType } from '@/types';

type Params = {
  contractAddress: string;
  transition: string;
  params: object[];
  amount: string;
};

const DEFAUL_GAS = {
  gasPrice: '2000',
  gaslimit: '5000'
};
export class ZilPayBase {
  public zilpay: ZilPayType;

  constructor(zilpay: ZilPayType) {
    this.zilpay = zilpay;
  }

  public get net() {
    return this.zilpay.wallet.net || 'testnet';
  }

  async getSubState(contract: string, field: string, params: string[] = []) {
    const res = await this
      .zilpay
      .blockchain
      .getSmartContractSubState(
        contract,
        field,
        params
      );

    if (res.error) {
      throw new Error(res.error);
    }

    if (res.result && res.result[field] && params.length === 0) {
      return res.result[field];
    }

    if (res.result && res.result[field] && params.length === 1) {
      const [arg] = params;
      return res.result[field][arg];
    }

    if (res.result && res.result[field] && params.length > 1) {
      return res.result[field];
    }

    return null;
  }

  async getBlockchainInfo() {
    const { error, result } = await this
      .zilpay
      .blockchain
      .getBlockChainInfo();

    if (error) {
      throw new Error(error);
    }

    return result;
  }

  async call(data: Params, gas = DEFAUL_GAS) {
    const { contracts, utils } = this.zilpay;
    const contract = contracts.at(data.contractAddress);
    const gasPrice = utils.units.toQa(gas.gasPrice, utils.units.Units.Li);
    const gasLimit = utils.Long.fromNumber(gas.gaslimit);
    const amount = data.amount || '0';

    return await contract.call(
      data.transition,
      data.params,
      {
        amount,
        gasPrice,
        gasLimit
      }
    );
  }
}