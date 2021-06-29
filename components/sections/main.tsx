import React from 'react';
import styled from 'styled-components';
import { isBrowser } from 'react-device-detect';
import Link from 'next/link';

import { Text } from 'components/text';
import { Button } from 'components/button';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.section`
  display: flex;
  align-items: center;

  height: 90vh;
  width: 100%;

  background-image: url(https://zilpay.io/wp-content/uploads/2021/03/bg.png);
  background-position: center center;
  background-size: cover;

  @media (max-width: 900px) {
    background-image: url(https://zilpay.io/wp-content/uploads/2021/03/mob2.png);
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding-left: 10vw;
  padding-right: 10vw;
`;

export const MainSection: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Text
          fontColors={Colors.Secondary}
          fontVariant={StyleFonts.Medium}
          size="12px"
        >
          THE WALLET OF THE ZILLIQA ECOSYSTEM
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="65px"
          css="line-height: 1.2em;ont-weight: 900;"
        >
          ZilPay Wallet
        </Text>
        <Text size="16px">
          A web3 wallet of the ZIlliqa blockchain.
        </Text>
        <Button>
          CHROME EXTENSION.
        </Button>
      </Wrapper>
    </Container>
  );
};
