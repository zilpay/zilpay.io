import styles from './index.module.scss';

import type { SwapPair } from '@/types/swap';
import type { TokenState } from '@/types/token';

import Big from 'big.js';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { useStore } from 'react-stores';

import { SwapSettings } from './settings';
import { FormInput } from './input';
import SwapIcon from 'components/icons/swap';
import { ConfirmSwapModal } from '@/components/modals/confirm-swap';
import { TokensModal } from '@/components/modals/tokens';
import { SwapSettingsModal } from '@/components/modals/settings';
import { PriceInfo } from '@/components/price-info';

import { DragonDex } from '@/mixins/dex';

import { $tokens } from '@/store/tokens';
import { $wallet } from '@/store/wallet';


type Prop = {
  startPair: SwapPair[];
};


Big.PE = 999;
const dex = new DragonDex();

export const SwapForm: React.FC<Prop> = ({ startPair }) => {
  const { t } = useTranslation(`swap`);

  const tokensStore = useStore($tokens);
  const wallet = useStore($wallet);

  const [modal0, setModal0] = React.useState(false);
  const [modal1, setModal1] = React.useState(false);
  const [modal3, setModal3] = React.useState(false);
  const [confirmModal, setConfirmModal] = React.useState(false);

  const [priceFrom, setPriceFrom] = React.useState(true);
  const [pair, setPair] = React.useState<SwapPair[]>(startPair);

  const tokensForPrice = React.useMemo(() => {
    if (priceFrom) {
      return [
        pair[0].meta,
        pair[1].meta,
      ];
    } else {
      return [
        pair[1].meta,
        pair[0].meta,
      ];
    }
  }, [priceFrom, tokensStore, pair]);

  const balances = React.useMemo(() => {
    let balance0 = '0';
    let balance1 = '0';

    if (!wallet) {
      return [balance0, balance1];
    }

    const found0 = tokensStore.tokens.find((t) => t.meta.base16 === pair[0].meta.base16);
    const found1 = tokensStore.tokens.find((t) => t.meta.base16 === pair[1].meta.base16);

    if (found0 && found0.balance[String(wallet.base16).toLowerCase()]) {
      balance0 = found0.balance[String(wallet.base16).toLowerCase()];
    }

    if (found1 && found1.balance[String(wallet.base16).toLowerCase()]) {
      balance1 = found1.balance[String(wallet.base16).toLowerCase()];
    }

    return [balance0, balance1];
  }, [pair, tokensStore, wallet]);

  const disabled = React.useMemo(() => {
    return Number(pair[0].value) <= 0 || Number(pair[1].value) <= 0 || !(wallet?.base16);
  }, [pair, wallet]);


  const hanldeOnSwapForms = React.useCallback(() => {
    setPair(JSON.parse(JSON.stringify(pair.reverse())));
  }, [pair]);

  const hanldeSubmit = React.useCallback((event) => {
    event.preventDefault();
    setConfirmModal(true);
  }, []);

  const hanldeOnInput = React.useCallback((value) => {
    const unLinkedPair = JSON.parse(JSON.stringify(pair));

    unLinkedPair[0].value = String(value);
    unLinkedPair[1].value = dex.getRealPrice(unLinkedPair);

    setPair(unLinkedPair);
  }, [pair]);

  const hanldeOnSelectToken = React.useCallback((token: TokenState, index: number) => {
    const unLinkedPair = JSON.parse(JSON.stringify(pair));

    unLinkedPair[index].value = String(0);
    unLinkedPair[index].meta = token;

    setPair(unLinkedPair);
    setModal0(false);
    setModal1(false);
  }, [pair]);

  return (
    <>
      <SwapSettingsModal
        show={modal3}
        onClose={() => setModal3(false)}
      />
      <ConfirmSwapModal
        show={confirmModal}
        pair={pair}
        onClose={() => setConfirmModal(false)}
      />
      <TokensModal
        show={modal0}
        warn
        include
        exceptions={pair.map((t) => t.meta.base16)}
        onClose={() => setModal0(false)}
        onSelect={(token) => hanldeOnSelectToken(token, 0)}
      />
      <TokensModal
        show={modal1}
        include
        warn
        exceptions={pair.map((t) => t.meta.base16)}
        onClose={() => setModal1(false)}
        onSelect={(token) => hanldeOnSelectToken(token, 1)}
      />
      {pair.length === 2 ? (
        <form
          className={styles.container}
          onSubmit={hanldeSubmit}
        >
          <div className={styles.wrapper}>
            <h3>
              {t('title')}
            </h3>
            <SwapSettings onClick={() => setModal3(true)}/>
          </div>
          <FormInput
            value={Big(pair[0].value)}
            token={pair[0].meta}
            balance={balances[0]}
            onSelect={() => setModal0(true)}
            onInput={hanldeOnInput}
            onMax={hanldeOnInput}
          />
          <SwapIcon onClick={hanldeOnSwapForms}/>
          <FormInput
            value={Big(pair[1].value)}
            token={pair[1].meta}
            balance={balances[1]}
            disabled
            onSelect={() => setModal1(true)}
          />
          <PriceInfo
            tokens={tokensForPrice}
            onClick={() => setPriceFrom(!priceFrom)}
          />
          <button disabled={Boolean(disabled)}>
            {t('buttons.exchange')}
          </button>
        </form>
      ) : null}
    </>
  );
}
