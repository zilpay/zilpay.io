import styles from '@/styles/pages/swap.module.scss';

import Head from 'next/head';
import { useStore } from 'react-stores';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PoolOverview } from '@/components/pool';
import { DragonDex } from '@/mixins/dex';
import { $wallet } from '@/store/wallet';

const dex = new DragonDex();
export const PagePool: NextPage = () => {
  const wallet = useStore($wallet);

  const hanldeUpdate = React.useCallback(async() => {
    if (wallet) {
      await dex.updateState(wallet.base16);
    }
  }, [wallet]);

  React.useEffect(() => {
    hanldeUpdate();
  }, [wallet, hanldeUpdate]);

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
        <PoolOverview />
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
