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
  images: string[];
  description: string;
  category: string;
  owner: string;
}

export interface UploadApp {
  title: string;
  desUrl: string;
  url: string;
  ipfsImage: string[];
  ipfsIcon: string;
  category: string | number;
}

export class Explorer extends ZilPayBase {

  private _contract: {
    [key: string]: string;
  };
  private _appList = 'app_list';
  private _adList = 'ad_list';
  private _reserve = 'reserve';

  // 0x76a2027980f7c57bafb1c5d754038734983f1a15

  constructor(zilpay: ZilPayType) {
    super(zilpay);

    this._contract = {
      mainnet: '0xf27a87c0a82f7ddb1daed81904fcbee253d9fc29',
      testnet: '0x223edfb1376e68142a35d5612dd548c3f61fd992'
    };
  }

  public async getBannerList(): Promise<Banner[]> {
    const contract = this._contract[this.net];
    const result = await this.getSubState(contract, this._adList);

    if (result && Array.isArray(result)) {
      return result.map((el: { arguments: string[]; }) => ({
        block: el.arguments[1],
        url: el.arguments[2],
        ipfs: el.arguments[3]
      }));
    }

    return [];
  }

  public async getReserve(): Promise<string> {
    const contract = this._contract[this.net];
    const result = await this.getSubState(
      contract,
      this._reserve
    );

    return result;
  }

  public async getApplicationList(category: number | string): Promise<AnApp[]> {
    const contract = this._contract[this.net];
    const result = await this.getSubState(
      contract,
      this._appList,
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

  public async getApplication(category: number | string, owner: string): Promise<AnApp | null> {
    const contract = this._contract[this.net];
    const result = await this.getSubState(
      contract,
      this._appList,
      [String(category), owner]
    );

    if (result && result[category] && result[category][owner]) {
      return {
        owner,
        title: result[category][owner].arguments[0],
        description: result[category][owner].arguments[1],
        url: result[category][owner].arguments[2],
        images: result[category][owner].arguments[3],
        icon: result[category][owner].arguments[4],
        category: result[category][owner].arguments[5]
      };
    }

    return null;
  }
}
