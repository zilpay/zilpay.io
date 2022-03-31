import "@/styles/components/pages/_terms.scss";

import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export const PageNotFound: NextPage = () => {
  const { t } = useTranslation(`404`);

  return (
    <div className="nofound">
      <Head>
        <title>{t(`head_title`)}</title>
        <meta
          property="og:title"
          content={t(`head_title`)}
          key="title"
        />
      </Head>
      <div className="wrapper">
        <h1>
          {t(`title`)}
        </h1>
        <h2>
          {t(`sub_title`)}
        </h2>
      </div>
    </div>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`404`, `common`]),
  },
});

export default PageNotFound;
