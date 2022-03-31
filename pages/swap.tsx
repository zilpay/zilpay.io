import "@/styles/components/pages/_swap.scss";

import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SwapForm } from '@/components/dex/swap';


export const PageSwap: NextPage = () => {
  const { t } = useTranslation(`main`);
  return (
    <div className="swap">
       <Head>
        <title>Swap</title>
        <meta
          property="og:title"
          content={'Swap'}
          key="title"
        />
      </Head>
      <div>
        <SwapForm />
      </div>
    </div>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`main`, `common`]),
  },
});

export default PageSwap;
