import React from 'react';

import { Card } from 'components/card';

import { Container, Wrapper } from './styles';

export const InfoSection: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Card
          url="/icons/info-0.svg"
          title="Explore Decentralised Applications"
        >
          Be part of a secured decentralised digital world and start exploring ZRC2 assets and their applications.
        </Card>
        <Card
          url="/icons/info-1.svg"
          title="Buy, Send, Spend & Swap Tokens"
          selected
        >
          Available as a browser extension and mobile app, ZilPay equips you with a key vault, secure wallet, token exchange, and much more.
        </Card>
        <Card
          url="/icons/info-2.svg"
          title="Interoperability"
        >
          Make payments to anyone, anywhere with the ability to import accounts from any external wallet on the chain.
        </Card>
      </Wrapper>
    </Container>
  );
};
