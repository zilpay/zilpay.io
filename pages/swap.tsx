import styles from '@/styles/pages/swap.module.scss';

import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SwapForm } from '@/components/swap-form';


export const PageSwap: NextPage = () => {
  const { t } = useTranslation(`swap`);
  return (
    <div className={styles.container}>
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
    ...await serverSideTranslations(props.locale || `en`, [`swap`, `common`]),
  },
});

export default PageSwap;
