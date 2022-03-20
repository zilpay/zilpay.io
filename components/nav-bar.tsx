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
const Ul = styled.ul`
  display: flex;
  align-items: center;
`;
const Li = styled.li`
  cursor: pointer;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;

  border-bottom: solid 2px transparent;
  color: ${Colors.White};

  :hover {
    color: ${Colors.Secondary};
    border-bottom: solid 2px ${Colors.Secondary};
  }
`;
export const Anchor = styled.span`
  font-family: ${StyleFonts.SemiBold}, Sans-serif;
  font-size: 15px;
  font-weight: 500;
  padding-top: 20px;
  padding-bottom: 20px;
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
      <Ul>
        <Li>
          <Link href="/swap">
            <Anchor>
              Swap
            </Anchor>
          </Link>
        </Li>
        <Li>
          <Link href="/explorer">
            <Anchor>
              Explorer
            </Anchor>
          </Link>
        </Li>
        <Li>
          <a
            href="https://zilpay.github.io/zilpay-docs/"
            target="_blanck"
          >
            <Anchor>
              Documentation
            </Anchor>
          </a>
        </Li>
        <a
          href="https://drive.google.com/file/d/1X-z5AHBp2cOwyXo4ZuVCCBuk7MIX-r6k/view"
          target="_blanck"
        >
          <Button css="margin-left: 30px;margin-right: 30px;">
            WHITE PAPER
          </Button>
        </a>
      </Ul>
    </Container>
  );
