import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React from 'react';
import Big from 'big.js';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { NewPool } from 'components/dex/new-pool';

import { Text } from 'components/text';
import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';
import { SwapDirection, DragonDex } from '@/mixins/dex';
import { $pools } from '@/store/pools';
import { $wallet } from '@/store/wallet';

const Container = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background-image: url(/images/bg.webp);
  background-position: center center;
  background-size: 100%;
`;
const Wrapper = styled.div`
`;

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
    <Container>
       <Head>
        <title>Swap</title>
        <meta
          property="og:title"
          content={'Swap'}
          key="title"
        />
      </Head>
      <Wrapper>
        <NewPool />
      </Wrapper>
    </Container>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`main`, `common`]),
  },
});

export default PagePool;
