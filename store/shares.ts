import type { Share, DexPool } from '@/types/zilliqa';

import { StorageFields } from '@/config/storage-fields';

import { Store } from 'react-stores';

let init: {
  shares: Share,
  pools: DexPool
} = {
  shares: {},
  pools: {}
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

export function updateLiquidity(shares: Share, pools: DexPool) {
  $liquidity.setState({
    pools,
    shares
  });

  const serialized = JSON.stringify($liquidity.state, (_, v) => typeof v === 'bigint' ? v.toString() : v);
  window.localStorage.setItem(StorageFields.Liquidity, serialized);
}

export function updateShares(shares: Share) {
  $liquidity.setState({
    ...$liquidity.state,
    shares
  });

  const serialized = JSON.stringify($liquidity.state, (_, v) => typeof v === 'bigint' ? v.toString() : v);
  window.localStorage.setItem(StorageFields.Liquidity, serialized);
}

export function updateDexPools(pools: DexPool) {
  $liquidity.setState({
    ...$liquidity.state,
    pools
  });

  const serialized = JSON.stringify($liquidity.state, (_, v) => typeof v === 'bigint' ? v.toString() : v);
  window.localStorage.setItem(StorageFields.Liquidity, serialized);
}
