import Big from 'big.js';
import styled from 'styled-components';
import React from 'react';
import { useStore } from "effector-react";

import { Text } from 'components/text';
import { TokensModal } from '../modals/tokens';
import { FormInput } from './input';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

import { DragonDex, SwapDirection } from '@/mixins/dex';
import { ZilPayBase } from 'mixins/zilpay-base';
import { $pools } from '@/store/pools';
import { $wallet } from '@/store/wallet';
import { ZERO_ADDR } from '@/config/conts';
import { SwapSettings } from './settings';


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;
const ContainerForm = styled.form`
  background-color: #18191D;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 32px;
  padding-top: 20px;
  padding-left: 26px;
  padding-right: 26px;
`;
const IconWrapper = styled.span`
  cursor: pointer;
  position: absolute;
  transform: translate(0, 420%);
`;
const Button = styled.button`
  cursor: pointer;
  outline: none;
  border: 0;

  background-color: ${Colors.Secondary};

  width: 100%;
  padding: 25px;
  margin-block-start: 15px;

  font-family: ${StyleFonts.Bold};
  font-size: 16px;
  text-transform: uppercase;
`;

enum Exact {
  Top,
  Bottom
}

Big.PE = 999;
const dex = new DragonDex();
const zilpay = new ZilPayBase();

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
  const hanldeOnSwap = React.useCallback(async(event) => {
    event.preventDefault();
    if (!wallet) {
      return;
    }
    try {
      switch (direction) {
        case SwapDirection.ZilToToken:
          const res0 = await dex.swapExactZILForTokens(
            exactAmount,
            limitAmount,
            wallet.base16,
            dex.pools[token1].meta.base16
          );
    
          console.log(res0);
        case SwapDirection.TokenToZil:
          const res = await dex.swapExactTokensForZIL(
            exactAmount,
            limitAmount,
            wallet.base16,
            dex.pools[token1].meta.base16
          );
    
          console.log(res);
          break;
        case SwapDirection.TokenToTokens:
          const inputToken = exactType === Exact.Bottom ? tokenIndex1 : tokenIndex0;
          const outputToken = exactType === Exact.Top ? tokenIndex1 : tokenIndex0;
          const res1 = await dex.swapExactTokensForTokens(
            exactAmount,
            limitAmount,
            wallet.base16,
            pools[inputToken].meta.base16,
            pools[outputToken].meta.base16
          );
          console.log(res1);
          break;
      }
    } catch {
      ///
    }
  }, [exactAmount, limitAmount, direction, wallet]);
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
      <ContainerForm onSubmit={hanldeOnSwap}>
        <Wrapper>
          <Text
            fontColors={Colors.Primary}
            fontVariant={StyleFonts.Bold}
            css="font-size: 25px;line-height: 1;"
          >
            Swap
          </Text>
          <SwapSettings />
        </Wrapper>
        <FormInput
          value={topAmount}
          token={pools[token0].meta}
          onInput={hanldeOnChangeTop}
          onSelect={() => setModal0(true)}
        />
        <IconWrapper onClick={hanldeOnSwapForms}>
          <svg width="32" height="33" viewBox="0 0 32 33" fill="none">
            <rect
              width="32"
              height="32"
              transform="translate(0 0.5)"
              fill="#23282E"
            />
            <path
              d="M23.1595 13.2071L22.0151 12.0628L22.0151 21.1685L20.0151 21.1685L20.0151 11.8904L18.6984 13.2071L17.2842 11.7929L20.9289 8.14813L24.5737 11.7929L23.1595 13.2071Z"
              fill={Colors.Secondary}
            />
            <path
              d="M9.95549 21.071L8.63875 19.7543L7.22454 21.1685L10.8693 24.8133L14.514 21.1685L13.0998 19.7543L11.9555 20.8986L11.9555 11.7929L9.9555 11.7929L9.95549 21.071Z"
              fill={Colors.Secondary}
            />
          </svg>
        </IconWrapper>
        <FormInput
          value={bottomAmount}
          token={pools[token1].meta}
          onInput={hanldeOnChangeBottom}
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
        <Button>
          Exchange
        </Button>
      </ContainerForm>
    </>
  );
}
