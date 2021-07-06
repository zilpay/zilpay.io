import React from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MainSection = dynamic(import(`components/sections/main`));
const InfoSection = dynamic(import(`components/sections/info`));
const FeaturesSection = dynamic(import(`components/sections/features`));
const AppsSection = dynamic(import(`components/sections/apps`));
const PartnershipsSection = dynamic(import(`components/sections/partnerships`));
const TestimonialsSection = dynamic(import(`components/sections/testimonials`));
const TeamSection = dynamic(import(`components/sections/team`));

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
