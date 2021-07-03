import { ZilPayBase } from './zilpay-base';
import { ZilPayType } from '@/types';

export class Explorer extends ZilPayBase {

  private _contract: {
    [key: string]: string;
  };

  constructor(zilpay: ZilPayType) {
    super(zilpay);

    this._contract = {
      mainnet: '0x0c20e40b3fe650c4c767db6bbb93db8295beac40',
      testnet: '0x64775441ce56bce245807389fccbae4e31b484b6'
    };
  }

  public async getBannerList(): Promise<{ block: string; url: string; ipfs: string; }[]> {
    const field = 'ad_list';
    const contract = this._contract[this.net];
    const result = await this.getSubState(contract, field);

    if (result) {
      return result.map((el: { arguments: string[]; }) => ({
        block: el.arguments[1],
        url: el.arguments[2],
        ipfs: el.arguments[3]
      }));
    }

    return [];
  }

  public async getApplicationList(category: number) {}
}
