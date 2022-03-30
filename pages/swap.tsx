import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import styled from 'styled-components';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SwapForm } from '@/components/dex/swap';

const Container = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background-image: url(/images/bg.webp);
  background-position: center center;
  background-size: 100%;
`;
const Wrapper = styled.div`
`;

export const PageSwap: NextPage = () => {
  const { t } = useTranslation(`main`);

  return (
    <Container>
       <Head>
        <title>Swap</title>
        <meta
          property="og:title"
          content={'Swap'}
          key="title"
        />
      </Head>
      <Wrapper>
        <SwapForm />
      </Wrapper>
    </Container>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`main`, `common`]),
  },
});

export default PageSwap;
