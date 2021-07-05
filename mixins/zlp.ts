import { ZilPayBase } from './zilpay-base';
import { ZilPayType } from '@/types';
import BN from 'bn.js';

export class ZLPExplorer extends ZilPayBase {

  public static DECIMAL = new BN('1000000000000000000');

  private _contract: {
    [key: string]: string;
  };
  private _allowances = 'allowances';
  private _balances = 'balances';

  constructor(zilpay: ZilPayType) {
    super(zilpay);

    this._contract = {
      mainnet: '0x0c20e40b3fe650c4c767db6bbb93db8295beac40',
      testnet: '0x5a16db0e4954e3436137109548fa2c94aea1fd97'
    };
  }

  public async getAllowances(address: string): Promise<BN> {
    const allowances = await this.getSubState(
      this._contract[this.net],
      this._allowances,
      [String(address).toLowerCase()]
    );

    if (!allowances || isNaN(allowances)) {
      return new BN(0);
    }

    return new BN(allowances);
  }

  public async getBalance(address: string) {
    const balance = await this.getSubState(
      this._contract[this.net],
      this._balances,
      [String(address).toLowerCase()]
    );

    if (!balance || isNaN(balance)) {
      return '0';
    }

    return balance;
  }

  public async approve(spender: string) {
    const amount = this.getBalance(this.zilpay.wallet.defaultAccount.bech32);
    const params = [
      {
        vname: 'spender',
        type: 'ByStr20',
        value: spender
      },
      {
        vname: 'amount',
        type: 'Uint128',
        value: amount
      }
    ];
    const contractAddress = this._contract[this.net];
    const transition = 'IncreaseAllowance';

    return this.call({
      params,
      contractAddress,
      transition,
      amount: '0'
    });
  }
}
