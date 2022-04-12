import styles from '@/styles/pages/swap.module.scss';

import Head from 'next/head';
import { useStore } from 'react-stores';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AddPoolForm } from '@/components/pool';

import { DragonDex } from '@/mixins/dex';
import { liquidityFromCache } from '@/store/shares';

const dex = new DragonDex();
export const PageAddPool: NextPage = () => {

  React.useEffect(() => {
    liquidityFromCache();
    dex.updateState();
  }, []);

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
