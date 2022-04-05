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
        bech32: 'zil1tjv8xrr5a8qjwfte3fmmazefccjd389ns9fd3m',
        base16: '0x5c98730c74e9c12725798a77be8b29c624d89cb3',
        decimals: 12,
        symbol: 'ZLP',
        name: 'Zilapy'
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

export function updateTokens(tokens: Token[]) {
  $tokens.setState({
    tokens
  });

  cacheState();
}
