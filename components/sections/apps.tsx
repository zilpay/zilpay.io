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

export const AppsSection: React.FC = () => {
  return (
    <Container>
      <HeaderWrapper>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="40px"
        >
          dApps
        </Text>
        <Text
          fontVariant={StyleFonts.Medium}
          fontColors={Colors.Secondary}
          size="12px"
        >
          EXPLORE DAPPS USING ZILPAY
        </Text>
      </HeaderWrapper>
      <Wrapper>
      </Wrapper>
    </Container>
  );
};
