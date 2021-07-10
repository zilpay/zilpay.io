import { sha256 } from 'js-sha256';
import { Zilliqa } from './base-zilliqa';

export class Explorer extends Zilliqa {
  private _contract: string;
  private _app = 'app_list';
  private _ad = 'ad_list';
  private _reserve = 'reserve';

  constructor(node: string, address: string) {
    super(node);

    this._contract = address;
  }

  public async updateApps() {
    const res = await this.getSmartContractSubState(
      this._contract,
      this._app
    );

    if (!res || res[this._app]) {
      return null;
    }

    return {
      hash: sha256(res[this._app]),
      list: res[this._app]
    };
  }

  public async getAds() {
    const res = await this.getSmartContractSubState(
      this._contract,
      this._ad
    );

    if (!res || res[this._ad]) {
      return null;
    }

    return {
      hash: sha256(res[this._ad]),
      list: res[this._ad]
    };
  }

  public async getReserve() {
    const res = await this.getSmartContractSubState(
      this._contract,
      this._reserve
    );

    return res[this._reserve];
  }
}
