import styles from '@/styles/pages/swap.module.scss';

import type { ListedTokenResponse } from '@/types/token';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useStore } from 'react-stores';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { RemovePoolForm } from '@/components/pool';
import { $tokens, loadFromServer } from '@/store/tokens';

import { DragonDex } from '@/mixins/dex';
import { ThreeDots } from 'react-loader-spinner';
import { ZilPayBackend } from '@/mixins/backend';
import { updateRate } from '@/store/settings';
import { updateDexPools } from '@/store/shares';
import { $wallet } from '@/store/wallet';


type Prop = {
  data: ListedTokenResponse;
};


const backend = new ZilPayBackend();
const dex = new DragonDex();

export const PageRemovePool: NextPage<Prop> = (props) => {
  const pool = useTranslation(`pool`);

  const router = useRouter();
  const tokensStore = useStore($tokens);
  const wallet = useStore($wallet);

  const token = React.useMemo(() => {
    return tokensStore.tokens.find(
      (t) => t.meta.base16 === String(router.query.addr).toLowerCase()
    );
  }, [tokensStore, router]);

  React.useEffect(() => {
    if (props.data) {
      updateDexPools(props.data.pools);
      updateRate(props.data.rate);
      loadFromServer(props.data.tokens.list);
    }
  }, [props]);

  React.useEffect(() => {
    if (wallet) {
      dex.updateState();
    }
  }, [wallet]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{pool.t('remove_pool.head')}</title>
        <meta
          property="og:title"
          content={pool.t('remove_pool.title')}
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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  if (context.res) {
    // res available only at server
    // no-store disable bfCache for any browser. So your HTML will not be cached
    context.res.setHeader(`Cache-Control`, `no-store`);
  }

  const data = await backend.getListedTokens();
  
  updateDexPools(data.pools);
  updateRate(data.rate);
  loadFromServer(data.tokens.list);

  return {
    props: {
      data,
      ...await serverSideTranslations(context.locale || `en`, [`pool`, `common`])
    }
  };
};

export default PageRemovePool;
