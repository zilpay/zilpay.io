import styles from '@/styles/pages/swap.module.scss';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useStore } from 'react-stores';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { RemovePoolForm } from '@/components/pool';
import { $tokens } from '@/store/tokens';

import { DragonDex } from '@/mixins/dex';
import { ThreeDots } from 'react-loader-spinner';


const dex = new DragonDex();
dex.updateState();
export const PageRemovePool: NextPage = () => {
  const router = useRouter();
  const tokensStore = useStore($tokens);

  const token = React.useMemo(() => {
    return tokensStore.tokens.find(
      (t) => t.meta.base16 === String(router.query.addr).toLowerCase()
    );
  }, [tokensStore, router]);

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
        {token ? (
          <RemovePoolForm token={token} />
        ) : (
          <ThreeDots color='var(--text-color)'/>
        )}
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
