import styles from './index.module.scss';

import { useStore } from 'react-stores';
import React from 'react';
import Big from 'big.js';
import classNames from 'classnames';
import Link from 'next/link';

import { FormInput, SwapSettings } from '@/components/swap-form';
import { TokensModal } from '@/components/modals/tokens';
import { BackIcon } from '@/components/icons/back';

import { $tokens } from '@/store/tokens';
import { $wallet } from '@/store/wallet';

import { DragonDex } from '@/mixins/dex';

import { DEFAULT_TOKEN_INDEX } from '@/config/conts';


const dex = new DragonDex();
export const AddPoolForm: React.FC = () => {
  const tokensStore = useStore($tokens);
  const wallet = useStore($wallet);

  const [amount, setAmount] = React.useState(Big(0));
  const [token, setToken] = React.useState(DEFAULT_TOKEN_INDEX);
  const [tokensModal, setTokensModal] = React.useState(false);

  const tokenBalance = React.useMemo(() => {
    const blk = tokensStore.tokens[token].balance[String(wallet?.base16).toLowerCase()];

    if (!blk) {
      return Big(0);
    }

    return Big(blk);
  }, [wallet, tokensStore, token]);

  const limitAmount = React.useMemo(() => {
    return dex.tokensToZil(String(amount), token);
  }, [amount, token]);

  const disabled = React.useMemo(() => {
    const decimals = dex.toDecimails(tokensStore.tokens[token].meta.decimals);
    const qa = amount.mul(decimals);
    return Number(amount) === 0 || tokenBalance.lt(qa);
  }, [amount, tokenBalance, amount, tokensStore, token]);

  const hanldeSelectToken0 = React.useCallback((token) => {
    const foundIndex = tokensStore
    .tokens
    .findIndex((p) => p.meta.base16 === token.base16);

    if (foundIndex >= 0) {
      setToken(foundIndex);
      setTokensModal(false);
    }
  }, [tokensStore, setToken]);

  return (
    <>
      <TokensModal
        show={tokensModal}
        tokens={tokensStore.tokens}
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
              token={tokensStore.tokens[token].meta}
              balance={tokensStore.tokens[token].balance[String(wallet?.base16).toLowerCase()]}
              onSelect={() => setTokensModal(true)}
              onInput={setAmount}
              onMax={setAmount}
            />
            <FormInput
              value={limitAmount}
              token={tokensStore.tokens[0].meta}
              balance={tokensStore.tokens[0].balance[String(wallet?.base16).toLowerCase()]}
              disabled
            />
          </div>
        </div>
        <button disabled={disabled}>
          Preview
        </button>
      </div>
    </>
  );
};
