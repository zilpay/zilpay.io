import type { Pool } from 'types/token';

import { Store } from 'react-stores';

import { ZERO_ADDR, ZERO_BECH32 } from '@/config/conts';

const initState: {
  pools: Pool[]
} = {
  pools: [
    {
      balance: {},
      meta: {
        bech32: ZERO_BECH32,
        base16: ZERO_ADDR,
        decimals: 12,
        symbol: 'ZIL',
        name: 'Zilliqa'
      }
    }
  ]
}

export const $pools = new Store(initState);
