import { Store } from 'react-stores';

const init = {
  lp: BigInt(100000000000000),
  fee: BigInt(10000),
  protoFee: BigInt(500)
}
export const $dex = new Store(init);
