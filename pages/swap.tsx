import styles from '@/styles/pages/swap.module.scss';

import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SwapForm } from '@/components/swap-form';

import { liquidityFromCache } from '@/store/shares';
import { DragonDex } from '@/mixins/dex';
import { Puff } from 'react-loader-spinner';

const dex = new DragonDex();
export const PageSwap: NextPage = () => {
  const { t } = useTranslation(`swap`);

  const [loading, setLoading] = React.useState(true);

  const hanldeUpdate = React.useCallback(async() => {
    if (typeof window !== 'undefined') {
      liquidityFromCache();
      try {
        await dex.updateState();
      } catch {
        ///
      }
      setLoading(false);
    }
  }, []);

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

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`swap`, `common`]),
  },
});

export default PageSwap;
