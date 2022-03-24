import type { Pool, PoolsState } from 'types/token';

import { createDomain } from "effector";
import { StorageFields } from '@/config/fileds';
import { ZERO_ADDR } from '@/config/conts';

const initState: PoolsState = {
  [ZERO_ADDR]: {
    pool: [BigInt(0), BigInt(0)],
    balance: {},
    meta: {
      bech32: 'zil1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq9yf6pz',
      base16: '0x0000000000000000000000000000000000000000',
      decimals: 12,
      symbol: 'ZIL',
      name: 'Zilliqa'
    }
  },
  ['0x487ba992c55c7fe55e1f784f78278364a4ef495c']: {
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
  ['0xd858528d4926ec6d17ff7cdde9c4cf1720806c2e']: {
    pool: [BigInt(0), BigInt(0)],
    balance: {},
    meta: {
      bech32: 'zil1mpv99r2fymkx69ll0nw7n3x0zusgqmpwlc4vvd',
      base16: '0xd858528d4926ec6d17ff7cdde9c4cf1720806c2e',
      decimals: 9,
      symbol: 'www',
      name: 'ttt'
    }
  }
};
const poolsDomain = createDomain();

export const updatePools = poolsDomain.createEvent<PoolsState>();
export const clearPools = poolsDomain.createEvent();

export const $pools = poolsDomain
  .createStore<PoolsState>(initState)
  .on(clearPools, () => initState)
  .on(updatePools, (_, payload) => {
    // window.localStorage.setItem(StorageFields.Pools, JSON.stringify(payload));

    return payload;
  });
