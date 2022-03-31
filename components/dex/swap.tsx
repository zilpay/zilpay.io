import Big from 'big.js';
import styled from 'styled-components';
import React from 'react';
import { useStore } from "effector-react";

import { Text } from 'components/text';
import { TokensModal } from 'components/modals/tokens';
import { FormInput } from 'components/dex/input';
import { ConfirmSwapModal } from 'components/modals/confirm-swap';
import { SwapSettings } from 'components/dex/settings';
import SwapIcon from 'components/icons/swap';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

import { DragonDex, SwapDirection } from '@/mixins/dex';

import { $pools } from '@/store/pools';
import { $wallet } from '@/store/wallet';
import { ZERO_ADDR } from '@/config/conts';


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;
const ContainerForm = styled.form`
  background-color: ${Colors.Card};
  padding: 1rem 1.25rem 0.5rem;

  border-radius: 16px;

  max-width: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;
const Button = styled.button`
  width: 100%;
  padding: 25px;

  font-size: 16px;
  text-transform: uppercase;

  margin-block-end: 0.6em;
  margin-block-start: 0.6em;

  :hover {
    color: ${Colors.Button};
    background: ${Colors.Primary};
  }
`;

enum Exact {
  Top,
  Bottom
}

Big.PE = 999;
const dex = new DragonDex();

let tokenIndex0 = 0;
let tokenIndex1 = 1;

let exactType = Exact.Top;

export const SwapForm: React.FC = () => {
  const pools = useStore($pools);
  const wallet = useStore($wallet);

  const [token0, setToken0] = React.useState(tokenIndex0);
  const [token1, setToken1] = React.useState(tokenIndex1);
  const [modal0, setModal0] = React.useState(false);
  const [modal1, setModal1] = React.useState(false);
  const [confirmModal, setConfirmModal] = React.useState(false);

  const [topAmount, setTopAmount] = React.useState(Big(0));
  const [bottomAmount, setBottomAmount] = React.useState(Big(0));
  const [direction, setDirection] = React.useState(SwapDirection.ZilToToken);

  const exactAmount = React.useMemo(() => {
    if (exactType === Exact.Top) {
      const decimals0 = dex.toDecimails(pools[tokenIndex0].meta.decimals);
      return topAmount.mul(decimals0);
    }

    const decimals1 = dex.toDecimails(pools[tokenIndex1].meta.decimals);

    return bottomAmount.mul(decimals1);
  }, [topAmount, bottomAmount, pools]);
  const limitAmount = React.useMemo(() => {
    if (exactType === Exact.Bottom) {
      const decimals0 = dex.toDecimails(pools[tokenIndex0].meta.decimals);
      return topAmount.mul(decimals0);
    }
    const decimals1 = dex.toDecimails(pools[tokenIndex1].meta.decimals);

    return bottomAmount.mul(decimals1);
  }, [topAmount, bottomAmount, pools]);

  const disabled = React.useMemo(() => {
    return exactAmount.eq(0) || !(wallet?.base16);
  }, [exactAmount, wallet]);

  const hanldeUpdate = React.useCallback(async() => {
    if (wallet) {
      await dex.updateState(wallet.base16);
    }
  }, [wallet, token1, pools]);

  const hanldeOnChangeTop = (amount: Big) => {
    let result = Big(0);

    if (pools[tokenIndex0].meta.base16 === ZERO_ADDR) {
      result = dex.zilToTokens(amount, tokenIndex1);
      setDirection(SwapDirection.ZilToToken);
    } else if (pools[tokenIndex1].meta.base16 === ZERO_ADDR) {
      result = dex.tokensToZil(amount, tokenIndex0);
      setDirection(SwapDirection.TokenToZil);
    } else {
      setDirection(SwapDirection.TokenToTokens);
      result = dex.tokensToTokens(amount, tokenIndex0, tokenIndex1);
    }

    exactType = Exact.Top;
    setTopAmount(amount);
    setBottomAmount(result);
  };
  const hanldeOnChangeBottom = (amount: Big) => {
    let result = Big(0);

    if (pools[tokenIndex1].meta.base16 === ZERO_ADDR) {
      result = dex.zilToTokens(amount, tokenIndex0);
      setDirection(SwapDirection.ZilToToken);
    } else if (pools[tokenIndex0].meta.base16 === ZERO_ADDR) {
      result = dex.tokensToZil(amount, tokenIndex1);
      setDirection(SwapDirection.TokenToZil);
    } else {
      setDirection(SwapDirection.TokenToTokens);
      result = dex.tokensToTokens(amount, tokenIndex1, tokenIndex0);
    }

    exactType = Exact.Bottom;
    setTopAmount(result);
    setBottomAmount(amount);
  };

  const hanldeOnSwapForms = React.useCallback(() => {
    const fst = token0
    const second = token1
    const amount0 = topAmount;
    const amount1 = bottomAmount;

    if (exactType === Exact.Top) {
      exactType = Exact.Bottom;
    } else {
      exactType = Exact.Top;
    }

    setToken1(fst);
    setToken0(second);
    setBottomAmount(amount0);
    setTopAmount(amount1);
  }, [token0, token1, topAmount, bottomAmount, pools]);
  const hanldeSubmit = React.useCallback((event) => {
    event.preventDefault();
    setConfirmModal(true);
  }, []);
  const hanldeSelectToken0 = React.useCallback((token) => {
    const foundIndex = pools.findIndex((p) => p.meta.base16 === token.base16);

    if (foundIndex >= 0) {
      tokenIndex0 = foundIndex;
      setToken0(foundIndex);
      setModal0(false);

      setBottomAmount(Big(0));
      setTopAmount(Big(0));
    }
  }, [pools]);
  const hanldeSelectToken1 = React.useCallback((token) => {
    const foundIndex = pools.findIndex((p) => p.meta.base16 === token.base16);

    if (foundIndex >= 0) {
      tokenIndex1 = foundIndex;
      setToken1(foundIndex);
      setModal1(false);

      setBottomAmount(Big(0));
      setTopAmount(Big(0));
    }
  }, [pools]);

  React.useEffect(() => {
    hanldeUpdate();
  }, [wallet]);

  return (
    <>
      <ConfirmSwapModal
        show={confirmModal}
        exact={exactAmount}
        limit={limitAmount}
        direction={direction}
        limitToken={exactType === Exact.Top ? pools[tokenIndex1].meta : pools[tokenIndex0].meta}
        exactToken={exactType === Exact.Bottom ? pools[tokenIndex1].meta : pools[tokenIndex0].meta}
        onClose={() => setConfirmModal(false)}
      />
      <TokensModal
        show={modal0}
        pools={pools}
        onClose={() => setModal0(false)}
        onSelect={hanldeSelectToken0}
      />
      <TokensModal
        show={modal1}
        pools={pools}
        onClose={() => setModal1(false)}
        onSelect={hanldeSelectToken1}
      />
      <ContainerForm onSubmit={hanldeSubmit}>
        <Wrapper>
          <Text
            fontColors={Colors.Text}
            fontVariant={StyleFonts.Bold}
            css="font-size: 18px;line-height: 1;"
          >
            Swap
          </Text>
          <SwapSettings />
        </Wrapper>
        <FormInput
          value={topAmount}
          token={pools[token0].meta}
          balance={pools[token0].balance[wallet?.base16 || '']}
          onInput={hanldeOnChangeTop}
          onMax={hanldeOnChangeTop}
          onSelect={() => setModal0(true)}
        />
          <SwapIcon onClick={hanldeOnSwapForms}/>
        <FormInput
          value={bottomAmount}
          token={pools[token1].meta}
          balance={pools[token1].balance[wallet?.base16 || '']}
          onInput={hanldeOnChangeBottom}
          onMax={hanldeOnChangeBottom}
          onSelect={() => setModal1(true)}
        />
        <Wrapper>
          <Text>
            1 TINCH = 0.0005395 ETH ($1.55824)
          </Text>
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M4.93193 14.1366C4.54256 14.5283 4.54442 15.1615 4.93609 15.5508C5.32777 15.9402 5.96093 15.9384 6.3503 15.5467L4.93193 14.1366ZM17.7423 15.1523C18.1328 15.5428 18.766 15.5428 19.1565 15.1523C19.547 14.7617 19.547 14.1286 19.1565 13.7381L17.7423 15.1523ZM12.2241 8.21985L12.9312 7.51275C12.7433 7.32485 12.4883 7.21946 12.2226 7.21985C11.9569 7.22025 11.7022 7.32638 11.5149 7.51483L12.2241 8.21985ZM19.1565 13.7381L12.9312 7.51275L11.517 8.92696L17.7423 15.1523L19.1565 13.7381ZM11.5149 7.51483L4.93193 14.1366L6.3503 15.5467L12.9332 8.92488L11.5149 7.51483Z" fill="#8A8A8F"/>
          </svg>
        </Wrapper>
        <Button disabled={Boolean(disabled)}>
          Exchange
        </Button>
      </ContainerForm>
    </>
  );
}
