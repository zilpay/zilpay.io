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
  pair: SwapPair[];
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
  }, [hanldeUpdate, props]);

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
        <SwapForm startPair={props.pair}/>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (context.res) {
    // res available only at server
    // no-store disable bfCache for any browser. So your HTML will not be cached
    context.res.setHeader(`Cache-Control`, `no-store`);
  }

  const data = await backend.getListedTokens();
  let pair = [
    {
      value: '0',
      meta: data.tokens.list[0]
    },
    {
      value: '0',
      meta: data.tokens.list[1]
    }
  ];

  if (context.query) {
    if (context.query['tokenIn']) {
      const found = data.tokens.list.find((t) => t.bech32 === context.query['tokenIn']);
      if (found) {
        pair[0].meta = found;
      }
    }

    if (context.query['tokenOut']) {
      const found = data.tokens.list.find((t) => t.bech32 === context.query['tokenOut']);
      if (found) {
        pair[1].meta = found;
      }
    }
  }

  updateDexPools(data.pools);
  updateRate(data.rate);
  loadFromServer(data.tokens.list);

  return {
    props: {
      data,
      pair,
      ...await serverSideTranslations(context.locale || `en`, [`swap`, `common`])
    }
  };
}

export default PageSwap;
