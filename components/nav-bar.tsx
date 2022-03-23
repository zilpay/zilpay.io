import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { Text } from 'components/text';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';
import { ConnectZIlPay } from './zilpay/connect-zilpay';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55px;
  padding: 10px;
  background-color: ${Colors.Black};
`;
const ContainerCenter = styled.div`
  display: flex;

  div {
    cursor: pointer;
    padding-left: 20px;
    padding-right: 20px;
  }
`;
const Logo = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
`;

export const Navbar: React.FC = () => (
  <Container>
    <Link href="/">
      <Logo>
        <img
          src="/icons/zilpay.svg"
          height="30"
          width-="30"
          alt="Logo"
        />
        <Text
          fontColors={Colors.White}
          fontVariant={StyleFonts.Bold}
          css="margin: 5px;"
        >
          ZilPay
        </Text>
      </Logo>
    </Link>
    <ContainerCenter>
      <Link href="/swap">
        <Text fontColors={Colors.Secondary}>
          SWAP
        </Text>
      </Link>
      <Link href="/pool">
        <Text fontColors={Colors.Secondary}>
          POOL
        </Text>
      </Link>
    </ContainerCenter>
    <ConnectZIlPay />
  </Container>
);
