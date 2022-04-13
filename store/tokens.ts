import type { Token } from 'types/token';

import { Store } from 'react-stores';

import { ZERO_ADDR, ZERO_BECH32 } from '@/config/conts';
import { StorageFields } from '@/config/storage-fields';

let initState: {
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
        bech32: 'zil1ewymycfgpc9he23usz2ju40yj2xn8h6xaczvve',
        base16: '0xcb89b261280e0b7caa3c80952e55e4928d33df46',
        decimals: 18,
        symbol: 'ZLP',
        name: 'ZIlPay'
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

export function addToken(token: Token) {
  const tokens = [...$tokens.state.tokens, token];
  $tokens.setState({
    tokens
  });
}

export function updateTokens(tokens: Token[]) {
  $tokens.setState({
    tokens
  });

  cacheState();
}
