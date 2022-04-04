import styles from './index.module.scss';

import { useStore } from 'react-stores';
import React from 'react';
import Big from 'big.js';
import classNames from 'classnames';
import Link from 'next/link';

import { FormInput, SwapSettings } from '@/components/swap-form';
import { TokensModal } from '@/components/modals/tokens';
import { BackIcon } from '@/components/icons/back';

import { $pools } from '@/store/pools';
import { $wallet } from '@/store/wallet';

import { DEFAULT_TOKEN_INDEX } from '@/config/conts';

export const AddPoolForm: React.FC = () => {
  const { pools } = useStore($pools);
  const wallet = useStore($wallet);

  const [amount, setAmount] = React.useState(Big(0));
  const [token, setToken] = React.useState(DEFAULT_TOKEN_INDEX);
  const [tokensModal, setTokensModal] = React.useState(false);

  const hanldeSelectToken0 = React.useCallback((token) => {
    const foundIndex = pools.findIndex((p) => p.meta.base16 === token.base16);

    if (foundIndex >= 0) {
      setToken(foundIndex);
    }
  }, [pools, setToken]);

  return (
    <>
      <TokensModal
        show={tokensModal}
        pools={pools}
        warn
        include
        onClose={() => setTokensModal(false)}
        onSelect={hanldeSelectToken0}
      />
      <div className={styles.container}>
        <div className={styles.row}>
          <Link href="/pool" passHref>
            <div className={styles.hoverd}>
              <BackIcon />
            </div>
          </Link>
          <h3>
            Add liquidity
          </h3>
          <SwapSettings onClick={() => null}/>
        </div>
        <div className={classNames(styles.row, {
          border: true
        })}>
          <div className={styles.column}>
            <p>
              Select pair and amount
            </p>
            <FormInput
              value={amount}
              token={pools[token].meta}
              balance={pools[token].balance[wallet?.base16 || '']}
              onSelect={() => setTokensModal(true)}
              onInput={setAmount}
              onMax={setAmount}
            />
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
    </>
  );
};
