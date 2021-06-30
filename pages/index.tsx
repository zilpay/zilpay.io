import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  MainSection,
  InfoSection,
  FeaturesSection,
  AppsSection,
  PartnershipsSection,
  TestimonialsSection,
  TeamSection
} from 'components/sections';

export const MainPage: NextPage = () => (
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

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
    props: {
      ...await serverSideTranslations(props.locale || `en`, [`main`, `common`]),
    },
  });

export default MainPage;
