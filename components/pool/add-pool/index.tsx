import styles from './index.module.scss';

import { useStore } from 'react-stores';
import React from 'react';
import Big from 'big.js';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import Link from 'next/link';

import { FormInput, SwapSettings } from '@/components/swap-form';
import { TokensModal } from '@/components/modals/tokens';
import { BackIcon } from '@/components/icons/back';

import { $tokens } from '@/store/tokens';
import { $wallet } from '@/store/wallet';

import { DragonDex } from '@/mixins/dex';

import { ZERO_ADDR } from '@/config/conts';
import { AddPoolPreviewModal } from '@/components/modals/add-pool-preview';
import { SwapSettingsModal } from '@/components/modals/settings';
import { $liquidity } from '@/store/shares';


type Prop = {
  index: number;
};

const dex = new DragonDex();
export const AddPoolForm: React.FC<Prop> = ({ index }) => {
  const pool = useTranslation(`pool`);

  const tokensStore = useStore($tokens);
  const wallet = useStore($wallet);
  const liquidity = useStore($liquidity);

  const [amount, setAmount] = React.useState(Big(0));
  const [limitAmount, setLimitAmount] = React.useState(Big(0));

  const [token, setToken] = React.useState(index);
  const [tokensModal, setTokensModal] = React.useState(false);
  const [previewModal, setPreviewModal] = React.useState(false);
  const [settingsModal, setSettingsModal] = React.useState(false);

  const tokenBalance = React.useMemo(() => {
    let balance = '0';
    const owner = String(wallet?.base16).toLowerCase();

    if (tokensStore.tokens[token] && tokensStore.tokens[token].balance[owner]) {
      balance = tokensStore.tokens[token].balance[owner];
    }

    return Big(balance);
  }, [wallet, tokensStore, token]);

  const exceptions = React.useMemo(() => {
    return [ZERO_ADDR, tokensStore.tokens[token].meta.base16];
  }, [tokensStore, token]);

  const hasPool = React.useMemo(() => {
    return Boolean(liquidity.pools[tokensStore.tokens[token].meta.base16]);
  }, [liquidity, tokensStore, token]);

  const disabled = React.useMemo(() => {
    const decimals = dex.toDecimails(tokensStore.tokens[token].meta.decimals);
    const qa = amount.mul(decimals);
    let isLess = false;

    if (!hasPool) {
      const zilDecimals = dex.toDecimails(tokensStore.tokens[0].meta.decimals);
      isLess = BigInt(String(limitAmount.mul(zilDecimals).round())) < dex.lp;
    }

    return Number(amount) === 0 || tokenBalance.lt(qa) || isLess;
  }, [tokenBalance, amount, limitAmount, tokensStore, token, hasPool]);

  const hanldeSelectToken0 = React.useCallback((t) => {
    const foundIndex = tokensStore
    .tokens
    .findIndex((p) => p.meta.base16 === t.base16);

    if (foundIndex >= 0 && t.base16 !== ZERO_ADDR) {
      setToken(foundIndex);
      setTokensModal(false);
    }
  }, [tokensStore]);

  const handleSubmit = React.useCallback((event) => {
    event.preventDefault();
    setPreviewModal(true);
  }, []);

  React.useEffect(() => {
    const tokenMeta = tokensStore.tokens[token].meta;
    const pool = liquidity.pools[tokenMeta.base16];

    if (pool && pool.length >= 2) {
      setLimitAmount(
        dex.calcVirtualAmount(amount, tokenMeta, pool)
      );
    }
  }, [amount, token, liquidity, tokensStore]);

  return (
    <>
      <SwapSettingsModal
        show={settingsModal}
        onClose={() => setSettingsModal(false)}
      />
      <TokensModal
        show={tokensModal}
        exceptions={exceptions}
        warn
        include
        onClose={() => setTokensModal(false)}
        onSelect={hanldeSelectToken0}
      />
      <AddPoolPreviewModal
        show={previewModal}
        amount={amount}
        limit={limitAmount}
        tokenIndex={token}
        hasPool={hasPool}
        onClose={() => setPreviewModal(false)}
      />
      <form
        className={styles.container}
        onSubmit={handleSubmit}
      >
        <div className={styles.row}>
          <Link href="/pool" passHref>
            <div className={styles.hoverd}>
              <BackIcon />
            </div>
          </Link>
          <h3>
            {pool.t('add_pool.title')}
          </h3>
          <SwapSettings onClick={() => setSettingsModal(true)}/>
        </div>
        <div className={classNames(styles.row, {
          border: true
        })}>
          <div className={styles.column}>
            <p>
              {pool.t('add_pool.sub_title')}
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
              disabled={hasPool}
              onInput={setLimitAmount}
              onMax={setLimitAmount}
            />
          </div>
        </div>
        <button disabled={disabled}>
          {pool.t('add_pool.button')}
        </button>
      </form>
    </>
  );
};
