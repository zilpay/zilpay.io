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
  index: number;
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
  }, []);

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
        <AddPoolForm index={props.index}/>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  let index = 1;
  const data = await backend.getListedTokens();

  updateDexPools(data.pools);
  updateRate(data.rate);
  loadFromServer(data.tokens.list);

  if (context.query) {
    if (context.query['token']) {
      const foundIndex = data.tokens.list.findIndex((t) => t.bech32 === context.query['token']);

      if (foundIndex >= 1) {
        index = foundIndex;
      }
    }
  }

  return {
    props: {
      data,
      index,
      ...await serverSideTranslations(context.locale || `en`, [`pool`, `common`])
    }
  };
};

export default PageAddPool;
