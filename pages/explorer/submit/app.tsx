import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  margin-bottom: 100px;
`;
export const SubmitAppPage: NextPage = () => (
    <>
      <Head>
        <title>Banner - ZilPay</title>
        <meta
          property="og:title"
          content="Banner - ZilPay"
          key="title"
        />
      </Head>
        <Container />
    </>
  )

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`explorer`, `common`]),
  },
});

export default SubmitAppPage;
