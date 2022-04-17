import { BLOCKS, NET, SLIPPAGE } from '@/config/conts';
import { Themes } from '@/config/themes';
import { Store } from 'react-stores';

const initState = {
  slippage: SLIPPAGE,
  blocks: BLOCKS,
  theme: Themes.Dark
};

export const $settings = new Store(initState);
