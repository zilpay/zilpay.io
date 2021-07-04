import { ZilPayBase } from './zilpay-base';
import { ZilPayType } from '@/types';


export interface Banner {
  block: string;
  url: string;
  ipfs: string;
}
export interface AnApp {
  title: string;
  icon: string;
  url: string;
  images: string;
  description: string;
  category: string;
  owner: string;
}

export class Explorer extends ZilPayBase {

  private _contract: {
    [key: string]: string;
  };

  constructor(zilpay: ZilPayType) {
    super(zilpay);

    this._contract = {
      mainnet: '0x0c20e40b3fe650c4c767db6bbb93db8295beac40',
      testnet: '0x6cef2b9fda817cbd07469d5d0fd5b91d26bcdc01'
    };
  }

  public async getBannerList(): Promise<Banner[]> {
    const field = 'ad_list';
    const contract = this._contract[this.net];
    const result = await this.getSubState(contract, field);

    if (result && Array.isArray(result)) {
      return result.map((el: { arguments: string[]; }) => ({
        block: el.arguments[1],
        url: el.arguments[2],
        ipfs: el.arguments[3]
      }));
    }

    return [];
  }

  public async getApplicationList(category: number | string): Promise<AnApp[]> {
    const field = 'app_list';

    const contract = this._contract[this.net];
    const result = await this.getSubState(
      contract,
      field,
      [String(category)]
    );

    if (!result) {
      return [];
    }

    return Object.keys(result).map((key) => ({
      owner: key,
      title: result[key].arguments[0],
      description: result[key].arguments[1],
      url: result[key].arguments[2],
      images: result[key].arguments[3],
      icon: result[key].arguments[4],
      category:result[key].arguments[5]
    }));
  }
}
