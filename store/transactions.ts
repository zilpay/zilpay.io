import type { Tx } from 'types/zilliqa';

import { Store } from 'react-stores';
import { LIMIT } from '@/config/conts';

const initState: {
  transactions: Tx[]
} = {
  transactions: []
};

export const $transactions = new Store(initState);

export function addTransactions(payload: Tx) {
  const { transactions } = $transactions.state;
  const newState = [payload, ...transactions];

  if (newState.length >= LIMIT) {
    newState.pop();
  }

  $transactions.setState({
    transactions: newState
  });

  window.localStorage.setItem(payload.from, JSON.stringify(newState));
}
