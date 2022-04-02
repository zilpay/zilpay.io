import { BLOCKS, NET, SLIPPAGE } from '@/config/conts';
import { Store } from 'react-stores';

const initState = {
  slippage: SLIPPAGE,
  blocks: BLOCKS
};

export const $settings = new Store(initState);
