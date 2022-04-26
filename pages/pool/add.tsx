import styles from '@/styles/pages/swap.module.scss';

import Head from 'next/head';
import { Puff } from 'react-loader-spinner';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AddPoolForm } from '@/components/pool';

import { DragonDex } from '@/mixins/dex';
import { liquidityFromCache } from '@/store/shares';
import { ZilPayBackend } from '@/mixins/backend';
import { updateRate } from '@/store/settings';
import { $tokens, loadFromServer } from '@/store/tokens';

const backend = new ZilPayBackend();
const dex = new DragonDex();
export const PageAddPool: NextPage = (props: any) => {
  const pool = useTranslation(`pool`);

  const [loading, setLoading] = React.useState(true);

  const hanldeUpdate = React.useCallback(async() => {
    if (typeof window !== 'undefined') {
      setLoading(true);
      liquidityFromCache();

      updateRate(props.rate);

      try {
        if ($tokens.state.tokens.length < 3) {
          loadFromServer(props.tokens);
        } 
      } catch {
        ////
      }

      try {
        await dex.updateTokens();
        await dex.updateState();
      } catch {
        ///
      }
      setLoading(false);
    }
  }, [props]);

  React.useEffect(() => {
    hanldeUpdate();
  }, [hanldeUpdate]);

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
        {loading ? (
          <Puff color="var(--primary-color)"/>
        ) : (
          <AddPoolForm />
        )}
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

  const tokens = await backend.getListedTokens();
  const rate = await backend.getRate();

  return {
    props: {
      tokens,
      rate,
      ...await serverSideTranslations(props.locale || `en`, [`pool`, `common`])
    },
    revalidate: 1,
  };
};

export default PageAddPool;
