import styles from './index.module.scss';

import { useStore } from 'react-stores';
import React from 'react';
import Big from 'big.js';

import { FormInput, SwapSettings } from '@/components/swap-form';
import SwapIcon from '@/components/icons/swap';

import { $pools } from '@/store/pools';
import { $wallet } from '@/store/wallet';

import { DEFAULT_TOKEN_INDEX } from '@/config/conts';

export const AddPoolForm: React.FC = () => {
  const { pools } = useStore($pools);
  const wallet = useStore($wallet);

  const [token, setToken] = React.useState(DEFAULT_TOKEN_INDEX);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h3>
          Add liquidity
        </h3>
        <SwapSettings onClick={() => null}/>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <h4>
            Select pair and amount
          </h4>
          <FormInput
            value={Big(0)}
            token={pools[token].meta}
            balance={pools[token].balance[wallet?.base16 || '']}
          />
          <SwapIcon />
          <FormInput
            value={Big(0)}
            token={pools[0].meta}
            balance={pools[0].balance[wallet?.base16 || '']}
            disabled
          />
        </div>
      </div>
      <button>
        Preview
      </button>
    </div>
  );
};
