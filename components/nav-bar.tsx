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
  background-color: ${Colors.Background};
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
const LinkText = styled(Text)`
  :hover {
    color: ${Colors.Primary};
  }
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
          fontColors={Colors.Text}
          fontVariant={StyleFonts.Bold}
          css="margin: 5px;"
        >
          ZilPay
        </Text>
      </Logo>
    </Link>
    <ContainerCenter>
      <Link href="/swap">
        <LinkText fontColors={Colors.Text}>
          SWAP
        </LinkText>
      </Link>
      <Link href="/pool">
        <LinkText fontColors={Colors.Text}>
          POOL
        </LinkText>
      </Link>
    </ContainerCenter>
    <ConnectZIlPay />
  </Container>
);
