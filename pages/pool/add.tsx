import styles from '@/styles/pages/swap.module.scss';

import type { ListedTokenResponse } from '@/types/token';

import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AddPoolForm } from '@/components/pool';

import { DragonDex } from '@/mixins/dex';
import { ZilPayBackend } from '@/mixins/backend';
import { updateRate } from '@/store/settings';
import { $tokens, loadFromServer } from '@/store/tokens';
import { updateDexPools } from '@/store/shares';


type Prop = {
  data: ListedTokenResponse;
};


const backend = new ZilPayBackend();
const dex = new DragonDex();
export const PageAddPool: NextPage<Prop> = (props) => {
  const pool = useTranslation(`pool`);

  const hanldeUpdate = React.useCallback(async() => {
    if (typeof window !== 'undefined') {
      try {
        await dex.updateTokens();
        await dex.updateState();
      } catch {
        ///
      }
    }
  }, [props]);

  React.useEffect(() => {
    if (props.data) {
      updateDexPools(props.data.pools);
      updateRate(props.data.rate);
      loadFromServer(props.data.tokens.list);
    }

    hanldeUpdate();
  }, [hanldeUpdate, props]);

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

export const getStaticProps = async (props: GetServerSidePropsContext) => {
  if (props.res) {
    // res available only at server
    // no-store disable bfCache for any browser. So your HTML will not be cached
    props.res.setHeader(`Cache-Control`, `no-store`);
  }

  const data = await backend.getListedTokens();

  updateDexPools(data.pools);
  updateRate(data.rate);
  loadFromServer(data.tokens.list);

  return {
    props: {
      data,
      ...await serverSideTranslations(props.locale || `en`, [`pool`, `common`])
    },
    revalidate: 1,
  };
};

export default PageAddPool;
