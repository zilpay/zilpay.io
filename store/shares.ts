import type { Share, DexPool, FiledBalances } from '@/types/zilliqa';

import { StorageFields } from '@/config/storage-fields';

import { Store } from 'react-stores';

let init: {
  shares: Share,
  pools: DexPool,
  balances: FiledBalances
} = {
  shares: {},
  pools: {},
  balances: {}
};

try {
  const fromStorage = window.localStorage.getItem(StorageFields.Liquidity);

  if (fromStorage) {
    init = JSON.parse(fromStorage);
  }
} catch {
  ///
}

export const $liquidity = new Store(init);

function cacheState() {
  if (typeof window !== 'undefined') {
    const serialized = JSON.stringify($liquidity.state, (_, v) => typeof v === 'bigint' ? v.toString() : v);
    window.localStorage.setItem(StorageFields.Liquidity, serialized);
  }
}

export function updateLiquidity(shares: Share, pools: DexPool) {
  $liquidity.setState({
    pools,
    shares
  });

  cacheState();
}

export function updateShares(shares: Share) {
  $liquidity.setState({
    ...$liquidity.state,
    shares
  });

  cacheState();
}

export function updateDexPools(pools: DexPool) {
  $liquidity.setState({
    ...$liquidity.state,
    pools
  });

  cacheState();
}

export function updateDexBalances(balances: FiledBalances) {
  $liquidity.setState({
    ...$liquidity.state,
    balances
  });

  cacheState();
}
