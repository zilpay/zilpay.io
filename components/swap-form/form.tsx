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
import { $liquidity } from '@/store/shares';
import { $net } from '@/store/netwrok';
import classNames from 'classnames';
import { ZERO_ADDR } from '@/config/conts';
import { viewAddress } from '@/lib/viewblock';


type Prop = {
  startPair: SwapPair[];
};


Big.PE = 999;
const dex = new DragonDex();

export const SwapForm: React.FC<Prop> = ({ startPair }) => {
  const { t } = useTranslation(`swap`);

  const tokensStore = useStore($tokens);
  const wallet = useStore($wallet);
  const liquidity = useStore($liquidity);
  const network = useStore($net);

  const [modal0, setModal0] = React.useState(false);
  const [modal1, setModal1] = React.useState(false);
  const [modal3, setModal3] = React.useState(false);
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [info, setInfo] = React.useState(false);

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
  }, [priceFrom, pair]);

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
    const amount = Big(pair[0].value).mul(dex.toDecimails(pair[0].meta.decimals)).round();
    const isBalance = BigInt(String(amount)) > BigInt(balances[0]);
    return Number(pair[0].value) <= 0 || Number(pair[1].value) <= 0 || !(wallet?.base16) || isBalance;
  }, [pair, wallet, balances]);

  const direction = React.useMemo(() => {
    return dex.getDirection(pair);
  }, [pair]);

  const gasLimit = React.useMemo(() => {
    return dex.calcGasLimit(direction);
  }, [direction]);


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

    unLinkedPair[1].value = String(0);
    unLinkedPair[0].value = String(0);
    unLinkedPair[index].meta = token;

    setPair(unLinkedPair);
    setModal0(false);
    setModal1(false);
  }, [pair]);

  React.useEffect(() => {
    if (Number(pair[0].value) > 0) {
      hanldeOnInput(pair[0].value);
    }
  }, [liquidity, tokensStore]);

  return (
    <>
      <SwapSettingsModal
        show={modal3}
        onClose={() => setModal3(false)}
      />
      {confirmModal ? (
        <ConfirmSwapModal
          show={confirmModal}
          pair={pair}
          direction={direction}
          gasLimit={gasLimit}
          onClose={() => setConfirmModal(false)}
        />
      ) : null}
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
              {t('title')} {network.net !== 'mainnet' ? (
                <span>
                  ({network.net})
                </span>
              ) : null}
            </h3>
            <SwapSettings onClick={() => setModal3(true)}/>
          </div>
          <FormInput
            value={Big(pair[0].value)}
            token={pair[0].meta}
            balance={balances[0]}
            gasLimit={gasLimit}
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
            onShow={() => setInfo(!info)}
          />
          <ul className={classNames(styles.info, {
            show: info
          })}>
            <p>
              {t('info.warn')}
            </p>
            <li>
              {t('info.verify')} {pair.filter((t) => t.meta.base16 !== ZERO_ADDR).map((token) => (
                <a
                  key={token.meta.base16}
                  href={viewAddress(token.meta.bech32)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {token.meta.symbol} {' '}
                </a>
              ))}
            </li>
          </ul>
          <button disabled={Boolean(disabled)}>
            {t('buttons.exchange')}
          </button>
        </form>
      ) : null}
    </>
  );
}
