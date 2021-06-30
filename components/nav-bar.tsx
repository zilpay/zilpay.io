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
const Anchor = styled.a`
  font-family: ${StyleFonts.SemiBold}, Sans-serif;
  font-size: 15px;
  font-weight: 500;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const Navbar: React.FC = () => {
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
      <Ul>
        <Li>
          <Anchor href="/#services">
            Features
          </Anchor>
        </Li>
        <Li>
          <Anchor href="/#partnerships">
            Partnerships
          </Anchor>
        </Li>
        <Li>
          <Anchor href="/#team">
            Our Team
          </Anchor>
        </Li>
        <Li>
          <Anchor href="/#contact">
            Contact Us
          </Anchor>
        </Li>
        <Li>
          <Anchor
            href="https://zilpay.github.io/zilpay-docs/"
            target="_blanck"
          >
            Documentation
          </Anchor>
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
};
