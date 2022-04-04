import type { Pool } from 'types/token';

import { Store } from 'react-stores';

import { ZERO_ADDR, ZERO_BECH32 } from '@/config/conts';

const initState: {
  pools: Pool[]
} = {
  pools: [
    {
      pool: [BigInt(0), BigInt(0)],
      balance: {},
      meta: {
        bech32: ZERO_BECH32,
        base16: ZERO_ADDR,
        decimals: 12,
        symbol: 'ZIL',
        name: 'Zilliqa'
      }
    },
    {
      pool: [BigInt(0), BigInt(0)],
      balance: {},
      meta: {
        bech32: 'zil1fpa6nyk9t3l72hsl0p8hsfurvjjw7j2uyy54dd',
        base16: '0x487ba992c55c7fe55e1f784f78278364a4ef495c',
        decimals: 10,
        symbol: 'tst',
        name: 'tst'
      }
    },
    {
      pool: [BigInt(0), BigInt(0)],
      balance: {},
      meta: {
        bech32: 'zil1mpv99r2fymkx69ll0nw7n3x0zusgqmpwlc4vvd',
        base16: '0xd858528d4926ec6d17ff7cdde9c4cf1720806c2e',
        decimals: 9,
        symbol: 'www',
        name: 'ttt'
      }
    },
    {
      pool: [BigInt(0), BigInt(0)],
      balance: {},
      meta: {
        bech32: 'zil1tjv8xrr5a8qjwfte3fmmazefccjd389ns9fd3m',
        base16: '0x5c98730c74e9c12725798a77be8b29c624d89cb3',
        decimals: 18,
        symbol: 'ZLP',
        name: 'Zilapy'
      }
    }
  ]
}

export const $pools = new Store(initState);
