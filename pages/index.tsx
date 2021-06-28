import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { BrowserView, MobileView } from 'react-device-detect';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
`;

export const MainPage: NextPage = () => (
  <>
    <BrowserView>
      <Container>
        <h1> This is rendered only in browser </h1>
      </Container>
    </BrowserView>
    <MobileView>
      <Container>
        <h1> This is rendered only in mobile </h1>
      </Container>
    </MobileView>
  </>
);

export default MainPage;
