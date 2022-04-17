import styles from '@/styles/pages/swap.module.scss';

import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PoolOverview } from '@/components/pool';
import { DragonDex } from '@/mixins/dex';

import { liquidityFromCache } from '@/store/shares';

const dex = new DragonDex();
export const PagePool: NextPage = () => {
  const { t } = useTranslation(`pool`);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    liquidityFromCache();
    dex
    .updateState()
    .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{t('overview.head')}</title>
        <meta
          property="og:title"
          content={t('overview.head')}
          key="title"
        />
      </Head>
      <div>
        <PoolOverview loading={loading}/>
      </div>
    </div>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`pool`, `common`]),
  },
});

export default PagePool;
