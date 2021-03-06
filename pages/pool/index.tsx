import styles from '@/styles/pages/swap.module.scss';

import type { ListedTokenResponse } from '@/types/token';

import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PoolOverview } from '@/components/pool';
import { DragonDex } from '@/mixins/dex';

import { ZilPayBackend } from '@/mixins/backend';
import { updateRate } from '@/store/settings';
import { loadFromServer } from '@/store/tokens';
import { updateDexPools } from '@/store/shares';
import { useStore } from 'react-stores';
import { $wallet } from '@/store/wallet';

type Prop = {
  data: ListedTokenResponse;
};

const backend = new ZilPayBackend();
const dex = new DragonDex();
export const PagePool: NextPage<Prop> = (props) => {
  const { t } = useTranslation(`pool`);

  const wallet = useStore($wallet);

  const [loading, setLoading] = React.useState(true);

  const hanldeUpdate = React.useCallback(async() => {
    if (typeof window !== 'undefined') {
      setLoading(true);
      try {
        await dex.updateState();
      } catch {
        ///
      }
      setLoading(false);
  }
  }, []);

  React.useEffect(() => {
    if (props.data) {
      updateDexPools(props.data.pools);
      updateRate(props.data.rate);
      loadFromServer(props.data.tokens.list);
    }
  }, [props]);

  React.useEffect(() => {
    if (wallet) {
      hanldeUpdate();
    }
  }, [hanldeUpdate, wallet]);

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

export default PagePool;
