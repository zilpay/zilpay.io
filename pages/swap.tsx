import styles from '@/styles/pages/swap.module.scss';

import type { ListedTokenResponse } from '@/types/token';
import type { SwapPair } from '@/types/swap';

import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SwapForm } from '@/components/swap-form';

import { DragonDex } from '@/mixins/dex';
import { ZilPayBackend } from '@/mixins/backend';
import { updateRate } from '@/store/settings';
import { updateDexPools } from '@/store/shares';
import { loadFromServer } from '@/store/tokens';

type Prop = {
  data: ListedTokenResponse;
  paid: SwapPair[];
};

const dex = new DragonDex();
const backend = new ZilPayBackend();
export const PageSwap: NextPage<Prop> = (props) => {
  const { t } = useTranslation(`swap`);

  const hanldeUpdate = React.useCallback(async() => {
    if (typeof window !== 'undefined') {
      updateRate(props.data.rate);

      try {
        await dex.updateTokens();
        await dex.updateState();
      } catch {
        ///
      }
    }
  }, [props]);

  React.useEffect(() => {
    updateDexPools(props.data.pools);
    updateRate(props.data.rate);
    loadFromServer(props.data.tokens.list);

    hanldeUpdate();
  }, [hanldeUpdate]);

  return (
    <div className={styles.container}>
       <Head>
        <title>{t('head_title')}</title>
        <meta
          property="og:title"
          content={t('head_title')}
          key="title"
        />
      </Head>
      <div>
        {props.paid ? (
          <SwapForm startPair={props.paid}/>
        ) : null}
      </div>
    </div>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => {
  if (props.res) {
    // res available only at server
    // no-store disable bfCache for any browser. So your HTML will not be cached
    props.res.setHeader(`Cache-Control`, `no-store`);
  }

  const data = await backend.getListedTokens();
  const paid = [
    {
      value: '0',
      meta: data.tokens.list[0]
    },
    {
      value: '0',
      meta: data.tokens.list[1]
    }
  ];

  updateDexPools(data.pools);
  updateRate(data.rate);
  loadFromServer(data.tokens.list);

  return {
    props: {
      data,
      paid,
      ...await serverSideTranslations(props.locale || `en`, [`swap`, `common`])
    },
    revalidate: 1,
  };
};

export default PageSwap;
