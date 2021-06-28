import React from 'react';
import styled from 'styled-components';
import { BrowserView, MobileView } from 'react-device-detect';
import Link from 'next/link';

import { Text } from 'components/text';
import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
`;
const Ul = styled.ul`
`;
const Li = styled.li`
`;
const Anchor = styled.a`
  color: ${Colors.White};
  border-bottom: solid 2px transparent;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 15px;
  font-weight: 500;

  :hover {
    border-bottom: solid 2px ${Colors.Primary};
  }
`;

export const Navbar: React.FC = () => {
  return (
    <>
      <BrowserView>
        <Container>
          <Logo>
            <img
              src="/icons/zilpay.svg"
              height="30"
              width-="30"
            />
            <Text
              fontColors={Colors.White}
              fontVariant={StyleFonts.Bold}
            >
              ZilPay
            </Text>
          </Logo>
          <Ul>
            <Li>
              <Anchor href="/#services">
                <Text fontColors={Colors.White}>
                  Features
                </Text>
              </Anchor>
            </Li>
          </Ul>
        </Container>
      </BrowserView>
      <MobileView></MobileView>
    </>
  );
};
