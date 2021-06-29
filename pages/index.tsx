import React from 'react';
import { NextPage } from 'next';

import { Navbar } from 'components/nav-bar';
import {
  MainSection,
  InfoSection,
  FeaturesSection,
  AppsSection,
  PartnershipsSection
} from 'components/sections';

export const MainPage: NextPage = () => {

  return (
    <>
      <Navbar />
      <MainSection />
      <InfoSection />
      <FeaturesSection />
      <AppsSection />
      <PartnershipsSection />
    </>
  );
};

export default MainPage;
