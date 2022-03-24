import type { Pool, PoolsState } from 'types/token';

import { createDomain } from "effector";
import { StorageFields } from '@/config/fileds';

const initState: PoolsState = {};
const poolsDomain = createDomain();

export const updatePools = poolsDomain.createEvent<PoolsState>();
export const clearPools = poolsDomain.createEvent();

export const $pools = poolsDomain
  .createStore<PoolsState>(initState)
  .on(clearPools, () => initState)
  .on(updatePools, (_, payload) => {
    window.localStorage.setItem(StorageFields.Pools, JSON.stringify(payload));

    return payload;
  });
