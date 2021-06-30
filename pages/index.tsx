import React from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
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

export const MainPage: NextPage = () => {
  const { t } = useTranslation(`main`);

  return (
    <>
      <Head>
        <title>{t(`head_title`)}</title>
        <meta
          property="og:title"
          content={t(`head_title`)}
          key="title"
        />
      </Head>
      <MainSection />
      <InfoSection />
      <FeaturesSection />
      <AppsSection />
      <PartnershipsSection />
      <TestimonialsSection />
      <TeamSection />
    </>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
    props: {
      ...await serverSideTranslations(props.locale || `en`, [`main`, `common`]),
    },
  });

export default MainPage;
