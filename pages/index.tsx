import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import { Navbar } from 'components/nav-bar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainPage: NextPage = () => {

  return (
    <Container>
      <Navbar />
    </Container>
  );
};

export default MainPage;
