import React from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Slider from 'react-slick';
import { Text } from 'components/text';
import { Button } from 'components/button';

import { useZilPay } from 'mixins/zilpay';
import { Explorer, AnApp } from 'mixins/explorer';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { IPFS } from 'config/ipfs';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  margin-bottom: 100px;
`;
export const SubmitAppPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation(`explorer`);
  const zilpay = useZilPay();

  return (
    <>
      <Head>
        <title>Banner - ZilPay</title>
        <meta
          property="og:title"
          content={`Banner - ZilPay`}
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

export default SubmitAppPage;
