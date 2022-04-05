import styles from './index.module.scss';

import Big from 'big.js';
import React from 'react';
import { useStore } from 'react-stores';

import { SwapSettings } from './settings';
import { FormInput } from './input';
import SwapIcon from 'components/icons/swap';
import { ConfirmSwapModal } from '@/components/modals/confirm-swap';
import { TokensModal } from '@/components/modals/tokens';
import { SwapSettingsModal } from '@/components/modals/settings';

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

    if (foundIndex >= 0) {
      tokenIndex0 = foundIndex;
      setToken0(foundIndex);
      setModal0(false);

      setBottomAmount(Big(0));
      setTopAmount(Big(0));
    }
  }, [tokensStore]);
  const hanldeSelectToken1 = React.useCallback((token) => {
    const foundIndex = tokensStore.tokens.findIndex((p) => p.meta.base16 === token.base16);

    if (foundIndex >= 0) {
      tokenIndex1 = foundIndex;
      setToken1(foundIndex);
      setModal1(false);

      setBottomAmount(Big(0));
      setTopAmount(Big(0));
    }
  }, [tokensStore]);

  React.useEffect(() => {
    hanldeUpdate();
  }, [wallet, hanldeUpdate]);

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
        warn
        include
        onClose={() => setModal1(false)}
        onSelect={hanldeSelectToken1}
      />
      <form
        className={styles.container}
        onSubmit={hanldeSubmit}
      >
        <div className={styles.wrapper}>
          <h3>
            Swap
          </h3>
          <SwapSettings onClick={() => setModal3(true)}/>
        </div>
        <FormInput
          value={topAmount}
          token={tokensStore.tokens[token0].meta}
          balance={tokensStore.tokens[token0].balance[wallet?.base16 || '']}
          onInput={hanldeOnChangeTop}
          onMax={hanldeOnChangeTop}
          onSelect={() => setModal0(true)}
        />
        <SwapIcon onClick={hanldeOnSwapForms}/>
        <FormInput
          value={bottomAmount}
          token={tokensStore.tokens[token1].meta}
          balance={tokensStore.tokens[token1].balance[wallet?.base16 || '']}
          onInput={hanldeOnChangeBottom}
          onMax={hanldeOnChangeBottom}
          onSelect={() => setModal1(true)}
        />
        <div className={styles.wrapper}>
          <p>
            1 TINCH = 0.0005395 ETH ($1.55824)
          </p>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M4.93193 14.1366C4.54256 14.5283 4.54442 15.1615 4.93609 15.5508C5.32777 15.9402 5.96093 15.9384 6.3503 15.5467L4.93193 14.1366ZM17.7423 15.1523C18.1328 15.5428 18.766 15.5428 19.1565 15.1523C19.547 14.7617 19.547 14.1286 19.1565 13.7381L17.7423 15.1523ZM12.2241 8.21985L12.9312 7.51275C12.7433 7.32485 12.4883 7.21946 12.2226 7.21985C11.9569 7.22025 11.7022 7.32638 11.5149 7.51483L12.2241 8.21985ZM19.1565 13.7381L12.9312 7.51275L11.517 8.92696L17.7423 15.1523L19.1565 13.7381ZM11.5149 7.51483L4.93193 14.1366L6.3503 15.5467L12.9332 8.92488L11.5149 7.51483Z"
              fill="var(--muted-color)"
            />
          </svg>
        </div>
        <button disabled={Boolean(disabled)}>
          Exchange
        </button>
      </form>
    </>
  );
}
