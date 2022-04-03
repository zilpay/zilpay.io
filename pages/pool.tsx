import styles from '@/styles/pages/swap.module.scss';

import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PoolForm, PoolOverview } from '@/components/pool';


enum PoolState {
  Overview = 'overview',
  Add = 'add',
  Create = 'create'
}

export const PagePool: NextPage = () => {
  const router = useRouter();
  const [state, setState] = React.useState(PoolState.Overview);

  const hanldeChangeHash = React.useCallback((s: PoolState) => {
    window.location.hash = s;
    setState(s);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pool</title>
        <meta
          property="og:title"
          content={'Pool'}
          key="title"
        />
      </Head>
      <div>
        {state === PoolState.Overview ? (
          <PoolOverview onAdd={() => hanldeChangeHash(PoolState.Add)}/>
        ) : null}
        {state === PoolState.Add ? (
          <PoolForm />
        ) : null}
        {state === PoolState.Create ? (
          <div></div>
        ) : null}
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
