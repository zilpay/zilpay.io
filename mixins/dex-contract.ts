import { ZilPayType } from "@/types";
import Big from "big.js";
import { DragonDex } from "./dex";

export class DexContract {
  public swapExactZILForTokens(zil: Big, max: Big, recipient: string, token: string) {
    // const params = [
    //   {
    //     vname: 'token_address',
    //     type: 'ByStr20',
    //     value: token
    //   },
    //   {
    //     vname: 'min_token_amount',
    //     type: 'Uint128',
    //     value: String(max)
    //   },
    //   {
    //     vname: 'deadline_block',
    //     type: 'BNum',
    //     value: String(4354343543543)
    //   },
    //   {
    //     vname: 'recipient_address',
    //     type: 'ByStr20',
    //     value: recipient
    //   }
    // ];
    // const contractAddress = DragonDex.CONTRACT;
    // const transition = 'SwapExactZILForTokens';

    // return this.call({
    //   params,
    //   contractAddress,
    //   transition,
    //   amount: String(zil)
    // });
  }
}