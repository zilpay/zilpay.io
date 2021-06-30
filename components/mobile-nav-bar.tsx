import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { Text } from 'components/text';
import { BurgerIcon } from 'components/icons';
import { Button } from 'components/button';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 5px 16px;
`;

export const MobileNavBar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Container>
      <Link href="/">
        <div style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}>
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
        </div>
      </Link>
      <BurgerIcon
        height="25"
        width="30"
        onClick={() => setIsOpen(true)}
      />
    </Container>
  );
};
