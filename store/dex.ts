import { ZERO_ADDR } from '@/config/conts';
import { Store } from 'react-stores';

const init = {
  lp: BigInt(100000000000000),
  fee: BigInt(9950),
  protoFee: BigInt(500),
  rewardsPool: ZERO_ADDR
}
export const $dex = new Store(init);
