import React from 'react';
import { NextPage } from 'next';

import {
  MainSection,
  InfoSection,
  FeaturesSection,
  AppsSection,
  PartnershipsSection,
  TestimonialsSection,
  TeamSection
} from 'components/sections';

export const MainPage: NextPage = () => {

  return (
    <>
      <MainSection />
      <InfoSection />
      <FeaturesSection />
      <AppsSection />
      <PartnershipsSection />
      <TestimonialsSection />
      <TeamSection />
    </>
  );
};

export default MainPage;
