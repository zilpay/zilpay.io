import styles from '@/styles/pages/swap.module.scss';

import Head from 'next/head';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AddPoolForm } from '@/components/pool';


export const PageAddPool: NextPage = () => {
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
        <AddPoolForm />
      </div>
    </div>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`pool`, `common`]),
  },
});

export default PageAddPool;
