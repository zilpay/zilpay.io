import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { Text } from 'components/text';
import { MobileModal } from 'components/modals/mobile';
import { Anchor } from 'components/nav-bar';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';
import { Button } from './button';

const BurgerIcon = dynamic(import('components/icons/burger'));

const MobileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 5px 16px;
`;
const Ul = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Li = styled.li`
  padding: 10px;

  border-bottom: solid 2px transparent;
  color: ${Colors.White};

  :hover {
    color: ${Colors.Secondary};
    border-bottom: solid 2px ${Colors.Secondary};
  }
`;

export const MobileNavBar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <MobileContainer>
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
      </MobileContainer>
      <MobileModal
        show={isOpen}
        color={Colors.Black}
        onClose={() => setIsOpen(false)}
      >
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
          </a>
        </Ul>
        <Button css="margin-top: 8px;">
          WHITE PAPER
        </Button>
      </MobileModal>
    </>
  );
};
