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

Big.PE = 999;
const dex = new DragonDex();
const zilpay = new ZilPayBase();

export const SwapForm: React.FC = () => {
  const pools = useStore($pools);
  const wallet = useStore($wallet);

  const [token0, setToken0] = React.useState(0);
  const [token1, setToken1] = React.useState(1);
  const [modal0, setModal0] = React.useState(false);
  const [modal1, setModal1] = React.useState(false);

  const [topAmount, setTopAmount] = React.useState(Big(0));
  const [bottomAmoubnt, setBottomAmoubnt] = React.useState(Big(0));
  const [direction, setDirection] = React.useState(SwapDirection.ZilToToken);

  const hanldeUpdate = React.useCallback(async() => {
    if (wallet) {
      await dex.updateState(wallet.base16);
    }
  }, [wallet, token1, pools]);

  const hanldeOnChangeTop = React.useCallback((amount: Big) => {
  }, [token1]);
  const hanldeOnChangeBottom = React.useCallback((amount: Big) => {
  }, [token1]);
  const hanldeOnSwapForms = React.useCallback(() => {
    const fst = token0
    const second = token1
    const amount0 = topAmount;
    const amount1 = bottomAmoubnt;

    setToken1(fst);
    setToken0(second);
    setBottomAmoubnt(amount0);
    setTopAmount(amount1);
  }, [token0, token1, topAmount, bottomAmoubnt, pools]);
  const hanldeOnSwap = React.useCallback(async(event) => {
    event.preventDefault();
    if (!wallet) {
      return;
    }
    try {
      const decimals0 = dex.toDecimails(dex.pools[token0].meta.decimals);
      const decimals1 = dex.toDecimails(dex.pools[token1].meta.decimals);

      switch (direction) {
        case SwapDirection.ZilToToken:
          const zil = topAmount.mul(decimals0).round();
          const max_tokens = bottomAmoubnt.mul(decimals1).round();
          const res0 = await dex.swapExactZILForTokens(
            zil,
            max_tokens,
            wallet.base16,
            dex.pools[token1].meta.base16
          );
    
          console.log(res0);
        case SwapDirection.TokenToZil:
          const tokens = bottomAmoubnt.mul(decimals1).round();
          const max_zil = topAmount.mul(decimals0).round();
          const res = await dex.swapExactTokensForZIL(
            tokens,
            max_zil,
            wallet.base16,
            dex.pools[token1].meta.base16
          );
    
          console.log(res);
          break;
      }
    } catch {
      ///
    }
  }, [topAmount, bottomAmoubnt, direction, wallet, token0, token1]);
  const hanldeSelectToken0 = React.useCallback((token) => {
    const foundIndex = pools.findIndex((p) => p.meta.base16 === token.base16);

    if (foundIndex >= 0) {
      setToken0(foundIndex);
      setModal0(false);
    }
  }, [pools]);
  const hanldeSelectToken1 = React.useCallback((token) => {
    const foundIndex = pools.findIndex((p) => p.meta.base16 === token.base16);

    if (foundIndex >= 0) {
      setToken1(foundIndex);
      setModal1(false);
    }
  }, [pools]);

  React.useEffect(() => {
    hanldeUpdate();
  }, []);

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
            fontColors={Colors.White}
            fontVariant={StyleFonts.Bold}
            css="font-size: 25px;line-height: 1;"
          >
            Swap
          </Text>
          <svg width="26" height="27" viewBox="0 0 26 27" fill="none">
            <path
              d="M15.4267 26.8333H10.5734C9.94687 26.8333 9.40479 26.3973 9.27071 25.7853L8.72805 23.2733C8.00412 22.9561 7.31768 22.5595 6.68138 22.0906L4.23205 22.8706C3.63472 23.0611 2.98536 22.8097 2.67205 22.2666L0.240049 18.0653C-0.0698339 17.522 0.036927 16.8366 0.497382 16.4133L2.39738 14.68C2.31098 13.8948 2.31098 13.1025 2.39738 12.3173L0.497382 10.588C0.0362488 10.1644 -0.0705545 9.47825 0.240049 8.93463L2.66672 4.73063C2.98003 4.18756 3.62938 3.93614 4.22672 4.12663L6.67605 4.90663C7.00147 4.6655 7.34023 4.44292 7.69072 4.23996C8.02717 4.05022 8.37343 3.87842 8.72805 3.72529L9.27205 1.21596C9.40547 0.603918 9.94697 0.167285 10.5734 0.166626H15.4267C16.0531 0.167285 16.5946 0.603918 16.728 1.21596L17.2774 3.72663C17.6518 3.89131 18.0164 4.0774 18.3694 4.28396C18.6986 4.47438 19.0169 4.68315 19.3227 4.90929L21.7734 4.12929C22.3703 3.93952 23.0189 4.19084 23.332 4.73329L25.7587 8.93729C26.0686 9.48061 25.9618 10.166 25.5014 10.5893L23.6014 12.3226C23.6878 13.1078 23.6878 13.9001 23.6014 14.6853L25.5014 16.4186C25.9618 16.8419 26.0686 17.5273 25.7587 18.0706L23.332 22.2746C23.0189 22.8171 22.3703 23.0684 21.7734 22.8786L19.3227 22.0986C19.0126 22.327 18.6904 22.5384 18.3574 22.732C18.0078 22.9345 17.6473 23.1175 17.2774 23.28L16.728 25.7853C16.5941 26.3968 16.0527 26.8328 15.4267 26.8333ZM7.16005 19.1386L8.25338 19.9386C8.49985 20.1202 8.75673 20.2871 9.02272 20.4386C9.27298 20.5836 9.53067 20.7153 9.79471 20.8333L11.0387 21.3786L11.648 24.1666H14.3547L14.964 21.3773L16.208 20.832C16.7511 20.5925 17.2666 20.2947 17.7454 19.944L18.84 19.144L21.5614 20.0106L22.9147 17.6666L20.804 15.7426L20.9534 14.3933C21.019 13.8031 21.019 13.2075 20.9534 12.6173L20.804 11.268L22.916 9.33996L21.5614 6.99463L18.84 7.86129L17.7454 7.06129C17.2664 6.70891 16.751 6.40897 16.208 6.16663L14.964 5.62129L14.3547 2.83329H11.648L11.036 5.62263L9.79471 6.16663C9.53046 6.28268 9.27274 6.4131 9.02272 6.55729C8.75836 6.7084 8.50284 6.87444 8.25738 7.05463L7.16272 7.85463L4.44272 6.98796L3.08672 9.33996L5.19738 11.2613L5.04805 12.612C4.98245 13.2021 4.98245 13.7978 5.04805 14.388L5.19738 15.7373L3.08672 17.6613L4.44005 20.0053L7.16005 19.1386ZM12.9947 18.8333C10.0492 18.8333 7.66138 16.4455 7.66138 13.5C7.66138 10.5544 10.0492 8.16663 12.9947 8.16663C15.9402 8.16663 18.328 10.5544 18.328 13.5C18.3244 16.444 15.9387 18.8296 12.9947 18.8333ZM12.9947 10.8333C11.5379 10.8348 10.3519 12.0051 10.331 13.4617C10.3101 14.9184 11.4621 16.1222 12.9183 16.1655C14.3745 16.2087 15.5958 15.0753 15.6614 13.62V14.1533V13.5C15.6614 12.0272 14.4675 10.8333 12.9947 10.8333Z"
              fill={Colors.Secondary}
            />
          </svg>
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
          value={bottomAmoubnt}
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
