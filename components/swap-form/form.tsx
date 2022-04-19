import styles from './index.module.scss';

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

import { DragonDex, SwapDirection } from '@/mixins/dex';

import { $tokens } from '@/store/tokens';
import { $wallet } from '@/store/wallet';
import { ZERO_ADDR } from '@/config/conts';


enum Exact {
  Top,
  Bottom
}

Big.PE = 999;
const dex = new DragonDex();

let tokenIndex0 = 0;
let tokenIndex1 = 1;

export const SwapForm: React.FC = () => {
  const { t } = useTranslation(`swap`);

  const tokensStore = useStore($tokens);
  const wallet = useStore($wallet);

  const [token0, setToken0] = React.useState(tokenIndex0);
  const [token1, setToken1] = React.useState(tokenIndex1);
  const [modal0, setModal0] = React.useState(false);
  const [modal1, setModal1] = React.useState(false);
  const [modal3, setModal3] = React.useState(false);
  const [confirmModal, setConfirmModal] = React.useState(false);

  const [topAmount, setTopAmount] = React.useState(Big(0));
  const [bottomAmount, setBottomAmount] = React.useState(Big(0));
  const [direction, setDirection] = React.useState(SwapDirection.ZilToToken);
  const [exactType, setExactType] = React.useState(Exact.Top);

  const exactAmount = React.useMemo(() => {
    if (exactType === Exact.Top) {
      const decimals0 = dex.toDecimails(tokensStore.tokens[tokenIndex0].meta.decimals);
      return topAmount.mul(decimals0);
    }

    const decimals1 = dex.toDecimails(tokensStore.tokens[tokenIndex1].meta.decimals);

    return bottomAmount.mul(decimals1);
  }, [topAmount, bottomAmount, tokensStore, exactType]);
  const limitAmount = React.useMemo(() => {
    if (exactType === Exact.Bottom) {
      const decimals0 = dex.toDecimails(tokensStore.tokens[tokenIndex0].meta.decimals);
      return topAmount.mul(decimals0);
    }
    const decimals1 = dex.toDecimails(tokensStore.tokens[tokenIndex1].meta.decimals);

    return bottomAmount.mul(decimals1);
  }, [topAmount, bottomAmount, tokensStore, exactType]);

  const disabled = React.useMemo(() => {
    return exactAmount.eq(0) || !(wallet?.base16);
  }, [exactAmount, wallet]);

  const hanldeUpdate = React.useCallback(async() => {
    await dex.updateState();
  }, [wallet]);

  const hanldeOnChangeTop = React.useCallback((amount: Big) => {
    let result = Big(0);

    if (tokensStore.tokens[tokenIndex0].meta.base16 === ZERO_ADDR) {
      result = dex.zilToTokens(amount, tokenIndex1);
      setDirection(SwapDirection.ZilToToken);
    } else if (tokensStore.tokens[tokenIndex1].meta.base16 === ZERO_ADDR) {
      result = dex.tokensToZil(amount, tokenIndex0);
      setDirection(SwapDirection.TokenToZil);
    } else {
      setDirection(SwapDirection.TokenToTokens);
      result = dex.tokensToTokens(amount, tokenIndex0, tokenIndex1);
    }

    setExactType(Exact.Top);
    setTopAmount(amount);
    setBottomAmount(result);
  }, [tokensStore]);
  const hanldeOnChangeBottom = React.useCallback((amount: Big) => {
    let result = Big(0);

    if (tokensStore.tokens[tokenIndex1].meta.base16 === ZERO_ADDR) {
      result = dex.zilToTokens(amount, tokenIndex0);
      setDirection(SwapDirection.ZilToToken);
    } else if (tokensStore.tokens[tokenIndex0].meta.base16 === ZERO_ADDR) {
      result = dex.tokensToZil(amount, tokenIndex1);
      setDirection(SwapDirection.TokenToZil);
    } else {
      setDirection(SwapDirection.TokenToTokens);
      result = dex.tokensToTokens(amount, tokenIndex1, tokenIndex0);
    }

    setExactType(Exact.Bottom);
    setTopAmount(result);
    setBottomAmount(amount);
  }, [tokensStore]);

  const hanldeOnSwapForms = React.useCallback(() => {
    const fst = token0
    const second = token1
    const amount0 = topAmount;
    const amount1 = bottomAmount;

    tokenIndex0 = second;
    tokenIndex1 = fst;

    if (exactType === Exact.Top) {
      setExactType(Exact.Bottom);
    } else {
      setExactType(Exact.Top);
    }

    if (direction === SwapDirection.TokenToZil) {
      setDirection(SwapDirection.ZilToToken);
    } else if (direction === SwapDirection.ZilToToken) {
      setDirection(SwapDirection.TokenToZil);
    }

    setToken1(fst);
    setToken0(second);
    setBottomAmount(amount0);
    setTopAmount(amount1);
  }, [token0, token1, topAmount, bottomAmount, direction, exactType]);
  const hanldeSubmit = React.useCallback((event) => {
    event.preventDefault();
    setConfirmModal(true);
  }, []);
  const hanldeSelectToken0 = React.useCallback((token) => {
    const foundIndex = tokensStore.tokens.findIndex((p) => p.meta.base16 === token.base16);

    if (foundIndex >= 0 && foundIndex !== tokenIndex1) {
      tokenIndex0 = foundIndex;
      setToken0(foundIndex);
      setModal0(false);

      setBottomAmount(Big(0));
      setTopAmount(Big(0));
    }
  }, [tokensStore]);
  const hanldeSelectToken1 = React.useCallback((token) => {
    const foundIndex = tokensStore.tokens.findIndex((p) => p.meta.base16 === token.base16);

    if (foundIndex >= 0 && foundIndex !== tokenIndex0) {
      tokenIndex1 = foundIndex;
      setToken1(foundIndex);
      setModal1(false);

      setBottomAmount(Big(0));
      setTopAmount(Big(0));
    }
  }, [tokensStore]);

  React.useEffect(() => {
    hanldeUpdate();
  }, [hanldeUpdate]);

  return (
    <>
      <SwapSettingsModal
        show={modal3}
        onClose={() => setModal3(false)}
      />
      <ConfirmSwapModal
        show={confirmModal}
        exact={exactAmount}
        limit={limitAmount}
        direction={direction}
        limitToken={exactType === Exact.Top ? tokensStore.tokens[tokenIndex1].meta : tokensStore.tokens[tokenIndex0].meta}
        exactToken={exactType === Exact.Bottom ? tokensStore.tokens[tokenIndex1].meta : tokensStore.tokens[tokenIndex0].meta}
        onClose={() => setConfirmModal(false)}
      />
      <TokensModal
        show={modal0}
        tokens={tokensStore.tokens}
        warn
        include
        onClose={() => setModal0(false)}
        onSelect={hanldeSelectToken0}
      />
      <TokensModal
        show={modal1}
        tokens={tokensStore.tokens}
        include
        warn
        onClose={() => setModal1(false)}
        onSelect={hanldeSelectToken1}
      />
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
          value={topAmount}
          token={tokensStore.tokens[token0].meta}
          balance={tokensStore.tokens[token0].balance[String(wallet?.base16).toLowerCase()]}
          onInput={hanldeOnChangeTop}
          onMax={hanldeOnChangeTop}
          onSelect={() => setModal0(true)}
        />
        <SwapIcon onClick={hanldeOnSwapForms}/>
        <FormInput
          value={bottomAmount}
          token={tokensStore.tokens[token1].meta}
          balance={tokensStore.tokens[token1].balance[String(wallet?.base16).toLowerCase()]}
          onInput={hanldeOnChangeBottom}
          onMax={hanldeOnChangeBottom}
          onSelect={() => setModal1(true)}
        />
        <PriceInfo
          tokens={[
            tokensStore.tokens[token0].meta,
            tokensStore.tokens[token1].meta
          ]}
        />
        <button disabled={Boolean(disabled)}>
          {t('buttons.exchange')}
        </button>
      </form>
    </>
  );
}
