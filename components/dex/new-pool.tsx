import type { TokenState } from '@/types/token';

import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';
import { Button } from 'components/button';
import { TokensModal } from 'components/modals/tokens';

import { Colors } from '@/config/colors';

const Wrapper = styled.div`
  padding: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='3' stroke-dasharray='10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
`;
const Container = styled.div`
  background-color: #18191D;

  padding-bottom: 32px;
  padding-top: 20px;
  padding-left: 26px;
  padding-right: 26px;
`;

export const NewPool: React.FC = () => {
  const [modal, setModal] = React.useState(false);

  return (
    <>
      <Container>
        <Text fontColors={Colors.White}>
          Pools Overview
        </Text>
        <Wrapper>
          <Text>
            Your active liquidity positions will ppear here.
          </Text>
          <Button
            color={Colors.Secondary}
            onClick={() => setModal(true)}
          >
            New position
          </Button>
        </Wrapper>
      </Container>
      <TokensModal
        show={modal}
        onClose={() => setModal(false)}
      />
    </>
  );
};