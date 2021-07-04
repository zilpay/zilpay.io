import React from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import { Text } from 'components/text';

import { useZilPay } from 'mixins/zilpay';
import { Explorer, AnApp } from 'mixins/explorer';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { IPFS } from 'config/ipfs';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

export const AppPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation(`explorer`);

  return (
    <>
      <Head>
        <title>{t(`${router.query.category}`)} - ZilPay</title>
        <meta
          property="og:title"
          content={t(`${router.query.app} - ZilPay`)}
          key="title"
        />
      </Head>
    </>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`explorer`, `common`]),
  },
});

export async function getStaticPaths() {
  return {
    paths: [
      '/explorer/[category]/[app]',
      {
        params: {
          category: '0',
          app: '0'
        }
      }
    ],
    fallback: true
  }
}

export default AppPage;
