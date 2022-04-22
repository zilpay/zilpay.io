import type { Token } from 'types/token';

import { Store } from 'react-stores';

import { ZERO_ADDR, ZERO_BECH32 } from '@/config/conts';
import { StorageFields } from '@/config/storage-fields';

const initState: {
  tokens: Token[]
} = {
  tokens: [
    {
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
      balance: {},
      meta: {
        bech32: 'zil12h94srrtmaqwgq8nw9r9rwmkgw72yn0yc7x9ud',
        base16: '0x55cb580c6bdf40e400f3714651bb7643bca24de4',
        decimals: 18,
        symbol: 'ZLP',
        name: 'ZIlPay'
      }
    },
    {
      balance: {},
      meta: {
        bech32: 'zil1aex244g4y8dq72ztvnzdt6wsyjl6s5hxeugjar',
        base16: '0xee4caad51521da0f284b64c4d5e9d024bfa852e6',
        decimals: 7,
        symbol: 'SUP',
        name: 'Supporting'
      }
    },
    {
      balance: {},
      meta: {
        bech32: 'zil1ze9wvxemc5jfwrsuuvm627we44ftfq5tznpcrk',
        base16: '0x164ae61b3bc524970e1ce337a579d9ad52b4828b',
        decimals: 9,
        symbol: 'USDC',
        name: 'stabecoin'
      }
    }
  ]
};

export const $tokens = new Store(initState);


function cacheState() {
  if (typeof window !== 'undefined') {
    const serialized = JSON.stringify($tokens.state, (_, v) => typeof v === 'bigint' ? v.toString() : v);
    window.localStorage.setItem(StorageFields.Tokens, serialized);
  }
}

export function loadTokensfromCache() {
  try {
    const data = window.localStorage.getItem(StorageFields.Tokens);

    if (data) {
      const state = JSON.parse(String(data));

      if (state && state.tokens.length > initState.tokens.length) {
        $tokens.setState(state);
      }
    }
  } catch {
    ///
  }
}

export function addToken(token: Token) {
  const tokens = [...$tokens.state.tokens, token];
  $tokens.setState({
    tokens
  });
  cacheState();
}

export function updateTokens(tokens: Token[]) {
  $tokens.setState({
    tokens
  });

  cacheState();
}
