import type { ListedTokenResponse, Token } from 'types/token';

import { Store } from 'react-stores';

import { ZERO_ADDR, ZERO_BECH32 } from '@/config/conts';
import { StorageFields } from '@/config/storage-fields';

const ZILLIQA_TOKEN = {
  bech32: ZERO_BECH32,
  base16: ZERO_ADDR,
  decimals: 12,
  symbol: 'ZIL',
  name: 'Zilliqa',
  scope: 100
};

let initState: {
  tokens: Token[]
} = {
  tokens: [
    {
      balance: {},
      meta: ZILLIQA_TOKEN
    },
    {
      balance: {},
      meta: {
        bech32: 'zil12h94srrtmaqwgq8nw9r9rwmkgw72yn0yc7x9ud',
        base16: '0x55cb580c6bdf40e400f3714651bb7643bca24de4',
        decimals: 18,
        symbol: 'ZLP',
        name: 'ZilPay',
        scope: 100
      }
    }
  ]
};

if (typeof window !== 'undefined' && window.__NEXT_DATA__.props.pageProps.tokens) {
  try {
    const listedTokens = window.__NEXT_DATA__.props.pageProps.tokens as ListedTokenResponse;
    const list: Token[] = listedTokens.list.map((t) => ({
      balance: {},
      meta: t
    }));

    initState = {
      tokens: [
        {
          balance: {},
          meta: ZILLIQA_TOKEN
        },
        ...list
      ]
    };
  } catch (err) {
    console.warn(err);
  }
}

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

      if (state && state.tokens.length > 0) {
        const list = $tokens.state;
        const storageList: Token[] = state;

        for (let index = 0; index < storageList.length; index++) {
          const token = storageList[index];
          const found = list.tokens.find((t) => t.meta.base16 === token.meta.base16);
          
          if (!found) {
            console.log(token);
            list.tokens.push(token);
          }
        }

        $tokens.setState(list);
      }
    }
  } catch {
    ///
  }
}

export function addToken(token: Token) {
  const has = $tokens.state.tokens.some((t) => token.meta.base16 === t.meta.base16);

  if (has) {
    throw new Error('Token already has');
  }

  const tokens = [...$tokens.state.tokens, token];
  $tokens.setState({
    tokens
  });
  cacheState();
}

export function updateTokens(tokens: Token[]) {
  const newTokens = $tokens.state.tokens.map((token) => {
    const found = tokens.find((t) => t.meta.base16 === token.meta.base16);

    if (found) {
      token.balance = found.balance;
    }

    return token;
  });

  $tokens.setState({
    tokens: newTokens
  });

  cacheState();
}

export function loadFromServer(listedTokens: ListedTokenResponse) {
  const list: Token[] = listedTokens.list.map((t) => ({
    balance: {},
    meta: t
  }));
  const state = {
    tokens: [
      {
        balance: {},
        meta: ZILLIQA_TOKEN
      },
      ...list
    ]
  };

  $tokens.setState(state);
}
