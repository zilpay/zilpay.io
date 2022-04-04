import { NET } from '@/config/conts';
import { Store } from 'react-stores';

const init = {
  net: NET
}
export const $net = new Store(init);
