import type { Tx } from 'types/zilliqa';

import { Store } from 'react-stores';

const initState: {
  transactions: Tx[]
} = {
  transactions: []
};

export const $transactions = new Store(initState);
