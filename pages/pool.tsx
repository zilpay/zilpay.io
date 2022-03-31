import "@/styles/components/pages/_swap.scss";

import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React from 'react';
import Big from 'big.js';
import { useStore } from 'effector-react';

import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { NewPool } from 'components/dex/new-pool';

import { DragonDex } from '@/mixins/dex';
import { $pools } from '@/store/pools';
import { $wallet } from '@/store/wallet';


Big.PE = 999;
const dex = new DragonDex();

export const PagePool: NextPage = () => {
  const { t } = useTranslation(`main`);

  const pools = useStore($pools);
  const wallet = useStore($wallet);

  const [token, setToken] = React.useState(0);
  const [topAmount, setTopAmount] = React.useState(Big(0));
  const [bottomAmoubnt, setBottomAmoubnt] = React.useState(Big(0));

  const hanldeUpdate = React.useCallback(async() => {
    const t = pools[token];
    if (wallet) {
      await dex.updateState(wallet.base16);
    }
  }, [wallet, token, pools]);

  React.useEffect(() => {
    hanldeUpdate();
  }, []);

  return (
    <div className="pool">
       <Head>
        <title>Swap</title>
        <meta
          property="og:title"
          content={'Swap'}
          key="title"
        />
      </Head>
      <div>
        <NewPool />
      </div>
    </div>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`main`, `common`]),
  },
});

export default PagePool;
