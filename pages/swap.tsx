import styles from '@/styles/pages/swap.module.scss';

import type { ListedTokenResponse, Token } from '@/types/token';

import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SwapForm } from '@/components/swap-form';

import { liquidityFromCache } from '@/store/shares';
import { DragonDex } from '@/mixins/dex';
import { Puff } from 'react-loader-spinner';
import { ZilPayBackend } from '@/mixins/backend';
import { $tokens, loadFromServer } from '@/store/tokens';
import { updateRate } from '@/store/settings';

const dex = new DragonDex();
const backend = new ZilPayBackend();
export const PageSwap: NextPage = (props: any) => {
  const { t } = useTranslation(`swap`);

  const [loading, setLoading] = React.useState(true);

  const hanldeUpdate = React.useCallback(async() => {
    if (typeof window !== 'undefined') {
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
        <title>{t('head_title')}</title>
        <meta
          property="og:title"
          content={t('head_title')}
          key="title"
        />
      </Head>
      <div>
        {loading ? (
          <Puff color="var(--primary-color)"/>
        ) : (
          <SwapForm />
        )}
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

  const tokens = await backend.getListedTokens();
  const rate = await backend.getRate();

  return {
    props: {
      tokens,
      rate,
      ...await serverSideTranslations(props.locale || `en`, [`swap`, `common`])
    },
    revalidate: 1,
  };
};

export default PageSwap;
