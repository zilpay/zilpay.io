import styles from '@/styles/pages/swap.module.scss';

import Head from 'next/head';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export const PageRemovePool: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pool</title>
        <meta
          property="og:title"
          content={'PoolOverview'}
          key="title"
        />
      </Head>
      <div>
      </div>
    </div>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`pool`, `common`]),
  },
});

export async function getStaticPaths() {
  return {
    paths: [`/pool/addr`],
    fallback: true,
  };
}

export default PageRemovePool;
