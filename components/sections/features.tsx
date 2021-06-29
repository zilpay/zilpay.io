import React from 'react';
import styled from 'styled-components';

import { Card } from 'components/card';
import { Text } from 'components/text';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

const Container = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;

  margin-bottom: 20vh;
  margin-top: 20vh;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  max-width: 1200px;
  width: 100%;
  height: 100%;

  @media (max-width: 1000px) {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;
const HeaderWrapper = styled.div`
  width: 100%;
  margin-left: 22vw;
`;

export const FeaturesSection: React.FC = () => {
  return (
    <Container>
      <HeaderWrapper>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="40px"
        >
          Our features
        </Text>
        <Text
          fontVariant={StyleFonts.Medium}
          fontColors={Colors.Secondary}
          size="12px"
        >
          LEARN WHAT SETS US APART
        </Text>
      </HeaderWrapper>
      <Wrapper>
        <Card
          url="/icons/wallet.svg"
          title="Decentralised wallet"
        >
          You will have full ownership over all your assets.
        </Card>
        <Card
          url="/icons/location.svg"
          title="A portal to DApps"
        >
          You will be able to access all the main dApps on the Zilliqa blockchain
        </Card>
        <Card
          url="/icons/key.svg"
          title="Own your data"
        >
          You will always be able to access your account.
        </Card>
        <Card
          url="/icons/lock.svg"
          title="Multi-layer security"
        >
          Your assets will always be safe.
        </Card>
        <Card
          url="/icons/settings.svg"
          title="Transaction resetting"
        >
          You can reset your nounce at any given time
        </Card>
        <Card
          url="/icons/rokket.svg"
          title="Seamless experience"
        >
          You will always have a stable and reliable experience
        </Card>
      </Wrapper>
    </Container>
  );
};
