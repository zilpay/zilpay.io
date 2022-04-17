import styles from '@/styles/pages/swap.module.scss';

import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AddPoolForm } from '@/components/pool';

import { DragonDex } from '@/mixins/dex';
import { liquidityFromCache } from '@/store/shares';

const dex = new DragonDex();
export const PageAddPool: NextPage = () => {
  const pool = useTranslation(`pool`);

  React.useEffect(() => {
    liquidityFromCache();
    dex.updateState();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{pool.t('add_pool.head')}</title>
        <meta
          property="og:title"
          content={pool.t('add_pool.title')}
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
