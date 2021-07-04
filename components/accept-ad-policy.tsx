import React from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

import { Text } from 'components/text';
import { Button } from 'components/button';

import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.div`
  height: 60vh;
  border: solid 2px ${Colors.Secondary};
  border-radius: 8px;

  box-shadow: inset 10px gold;
  box-shadow: inset 0 0 5px ${Colors.Secondary};
  padding: 10px;
  max-width: 600px;
  width: 90%;

  overflow-y: scroll;
`;

export const AcceptAdPolicy: React.FC = () => {
  const { t } = useTranslation(`explorer`);
  return (
    <Container>
      <Text
        fontVariant={StyleFonts.Bold}
        fontColors={Colors.White}
        size="40px"
      >
        ZilPay Advertising agreements
      </Text>
      <Wrapper>
        <Text
          fontVariant={StyleFonts.Bold}
        >
          <strong>
            Advertising agreements
          </strong>
        </Text>
      </Wrapper>
      <Button css="margin: 10px;width: 250px;">
        Accept
      </Button>
    </Container>
  );
};
