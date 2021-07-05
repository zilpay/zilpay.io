import { ZilPayBase } from './zilpay-base';
import { ZilPayType } from '@/types';
import BN from 'bn.js';

import { ZLPExplorer } from './zlp';

export class ExplorerBanner extends ZilPayBase {

  public static CUSTOMIZATION = new BN('100000000');
  public static EXPONENT = new BN('2');
  public static ONE = new BN('1');
  public static MAX_BLOCKS = new BN('3000');

  public static getPoolBalance(s: BN) {
    const _n = ExplorerBanner.EXPONENT.add(ExplorerBanner.ONE);
    const _mn = ExplorerBanner.CUSTOMIZATION.div(_n);
    const _ts = s.add(ExplorerBanner.ONE);
    const _s_pow = _ts.pow(_n);
  
    return _mn.mul(_s_pow);
  }

  public static getPrice(s: BN, b: BN) {
    const _n = ExplorerBanner.EXPONENT.add(ExplorerBanner.ONE);
    const _mn = ExplorerBanner.CUSTOMIZATION.div(_n);
    const _ts = s.add(ExplorerBanner.ONE);
    const _sk = _ts.add(ExplorerBanner.ONE);
    const _sk_exp = _sk.pow(_n);
    const _v = _mn.mul(_sk_exp);
  
    return _v.sub(b);
  }

  public static zlpToBlocks(amount: BN, blockDecimal: BN) {
    const _value = amount.div(blockDecimal);
  
    if (_value.gt(ExplorerBanner.MAX_BLOCKS)) {
      return ExplorerBanner.MAX_BLOCKS;
    }
  
    return _value;
  }

  public static estimateBlocks(amount: number, reserve: string) {
    const _reserve = new BN(reserve);
    const _amount = new BN(amount).mul(ZLPExplorer.DECIMAL);
    const _b = ExplorerBanner.getPoolBalance(_reserve);
    const _price = ExplorerBanner.getPrice(_reserve, _b);
    const _blocks = ExplorerBanner.zlpToBlocks(_amount, _price);

    return {
      blocks: String(_blocks),
      price: String(_price),
      decimal: Number(ZLPExplorer.DECIMAL)
    }
  }

  private _contract: {
    [key: string]: string;
  };

  constructor(zilpay: ZilPayType) {
    super(zilpay);

    this._contract = {
      mainnet: '0x0c20e40b3fe650c4c767db6bbb93db8295beac40',
      testnet: '0x52777257408f4bca9d2fdceca4b3c3be4827f82c'
    };
    
  }

  public get selfAddress() {
    return this._contract[this.net];
  }

  public async place(amount: number, url: string, ipfs: string) {
    const _amount = new BN(amount).mul(ZLPExplorer.DECIMAL);
    const params = [
      {
        vname: 'amount',
        type: 'Uint128',
        value: String(_amount)
      },
      {
        vname: 'url',
        type: 'String',
        value: url
      },
      {
        vname: 'ipfs',
        type: 'String',
        value: ipfs
      }
    ];
    const contractAddress = this._contract[this.net];
    const transition = 'AddAdvertising';

    return this.call({
      params,
      contractAddress,
      transition,
      amount: '0'
    });
  }
}