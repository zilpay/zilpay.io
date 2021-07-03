import React from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container } from 'components/wrappers/terms-policy';

import { useZilPay } from 'mixins/zilpay';
import { Explorer } from 'mixins/explorer';

export const ExplorerMainPage: NextPage = () => {
  const { t } = useTranslation(`explorer`);
  const zilpay = useZilPay();

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
      <Container>

      </Container>
    </>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`explorer`, `common`]),
  },
});

export default ExplorerMainPage;
