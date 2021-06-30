import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { Text } from 'components/text';
import { Button } from 'components/button';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px;
`;
const Logo = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
`;

export const MobileNavBar: React.FC = () => {
  return (
    <Container>
      <Link href="/">
        <Logo>
          <img
            src="/icons/zilpay.svg"
            height="30"
            width-="30"
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
    </Container>
  );
};
