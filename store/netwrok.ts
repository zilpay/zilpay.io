import { NET } from '@/config/conts';
import { Store } from 'react-stores';

const init: {
  net: 'mainnet' | 'testnet' | 'private';
} = {
  net: NET
}
export const $net = new Store(init);
