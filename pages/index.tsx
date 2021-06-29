import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import { Navbar } from 'components/nav-bar';
import {
  MainSection,
  InfoSection
} from 'components/sections';

export const MainPage: NextPage = () => {

  return (
    <>
      <Navbar />
      <MainSection />
      <InfoSection />
    </>
  );
};

export default MainPage;
