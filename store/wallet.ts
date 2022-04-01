import type { Wallet } from '@/types/wallet';

import { Store } from 'react-stores';

export const $wallet = new Store<Wallet | null>(null);
