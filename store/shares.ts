import { StorageFields } from '@/config/storage-fields';
import { Share } from '@/types/zilliqa';

import { Store } from 'react-stores';

let init: Share = {};

try {
  const fromStorage = window.localStorage.getItem(StorageFields.Shares);

  if (fromStorage) {
    init = JSON.parse(fromStorage);
  }
} catch {
  ///
}

export const $shares = new Store(init);

export function updateShares(shares: Share) {
  $shares.setState(shares);

  const serialized = JSON.stringify(shares, (_, v) => typeof v === 'bigint' ? v.toString() : v);
  window.localStorage.setItem(StorageFields.Shares, serialized);
}
