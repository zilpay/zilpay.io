import { ZilPayBase } from './zilpay-base';
import { ZilPayType } from '@/types';
import Big from 'big.js';

import { ZLPExplorer } from './zlp';

export interface UploadApp {
  title: string;
  desUrl: string;
  url: string;
  ipfsImage: string[];
  ipfsIcon: string;
  category: string | number;
}

export class ExplorerBanner extends ZilPayBase {

  public static CUSTOMIZATION = Big('100000000');
  public static EXPONENT = Big('2');
  public static ONE = Big('1');
  public static MAX_BLOCKS = Big('5000');

  public static getPoolBalance(s: Big) {
    const _n = ExplorerBanner.EXPONENT.add(ExplorerBanner.ONE);
    const _mn = ExplorerBanner.CUSTOMIZATION.div(_n);
    const _ts = s.add(ExplorerBanner.ONE);
    const _s_pow = _ts.pow(Number(_n));
  
    return _mn.mul(_s_pow);
  }

  public static getPrice(s: Big, b: Big) {
    const _n = ExplorerBanner.EXPONENT.add(ExplorerBanner.ONE);
    const _mn = ExplorerBanner.CUSTOMIZATION.div(_n);
    const _ts = s.add(ExplorerBanner.ONE);
    const _sk = _ts.add(ExplorerBanner.ONE);
    const _sk_exp = _sk.pow(_n.toNumber());
    const _v = _mn.mul(_sk_exp);
  
    return _v.sub(b);
  }

  public static zlpToBlocks(amount: Big, blockDecimal: Big) {
    const _value = amount.div(blockDecimal);
  
    if (_value.gt(ExplorerBanner.MAX_BLOCKS)) {
      return ExplorerBanner.MAX_BLOCKS;
    }
  
    return _value;
  }

  public static estimateBlocks(amount: number, reserve: string) {
    const _reserve = Big(reserve);
    const _amount = Big(amount).mul(ZLPExplorer.DECIMAL);
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
      mainnet: '0x1b0652c2eaf61f5505ef4f4e2e190ec647d9f0eb',
      testnet: '0xb85cfededeac9eb1f838484404f0c182f3920365'
    };
    
  }

  public get selfAddress() {
    return this._contract[this.net];
  }

  public async placeBanner(amount: number, url: string, ipfs: string) {
    const _amount = Big(amount).mul(ZLPExplorer.DECIMAL);
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

  public addApplication(data: UploadApp) {
    const params = [
      {
        vname: 'title',
        type: 'String',
        value: data.title
      },
      {
        vname: 'des_url',
        type: 'String',
        value: data.desUrl
      },
      {
        vname: 'url',
        type: 'String',
        value: data.url
      },
      {
        vname: 'ipfs_image',
        type: 'List String',
        value: data.ipfsImage
      },
      {
        vname: 'ipfs_icon',
        type: 'String',
        value: data.ipfsIcon
      },
      {
        vname: 'category',
        type: 'Uint32',
        value: String(data.category)
      }
    ];
    const contractAddress = this._contract[this.net];
    const transition = 'AddApp';

    return this.call({
      params,
      contractAddress,
      transition,
      amount: '0'
    });
  }
}
