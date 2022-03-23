import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React from 'react';
import Big from 'big.js';
import styled from 'styled-components';

import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Background } from 'components/sections/main';

import { Text } from 'components/text';
import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';
import { SwapDirection, DragonDex } from '@/mixins/dex';

const Container = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background-image: url(/images/bg.webp);
  background-position: center center;
  background-size: 150%;
`;
const Wrapper = styled.div`
`;
const ContainerForm = styled.form`
  padding: 36px;
  background-color: #18191D;
`;

Big.PE = 999;
const dex = new DragonDex();

const token = '0xd858528d4926ec6d17ff7cdde9c4cf1720806c2e';
const owner = '0xb72966338CDd4ed23a4E11C160dDBd060366F9ad';

export const PagePool: NextPage = () => {
  const { t } = useTranslation(`main`);

  const [topAmount, setTopAmount] = React.useState(Big(0));
  const [bottomAmoubnt, setBottomAmoubnt] = React.useState(Big(0));

  const hanldeOnChangeTop = React.useCallback((event) => {
    try {
      const amount = Big(event.target.value);
      const circular = dex.zilToTokens(amount, token);

      setTopAmount(amount);
      setBottomAmoubnt(circular);
    } catch {
      ///
    }
  }, []);
  const hanldeOnChangeBottom = React.useCallback((event) => {
    try {
      const amount = Big(event.target.value);
      const circular = dex.tokensToZil(amount, token);

      setTopAmount(circular);
      setBottomAmoubnt(amount);
    } catch {
      ///
    }
  }, []);
  const hanldeAddPool = React.useCallback(async() => {
    try {
      const decimals = dex.toDecimails(dex.pools[token].decimals);
      const zildecimals = dex.toDecimails(12);
      const zil = topAmount.mul(zildecimals).round();
      const maxTokens = bottomAmoubnt.mul(decimals).round();
      const res0 = await dex.addLiquidity(
        zil,
        maxTokens,
        zil,
        token
      );
      console.log(res0);
    } catch {
      ////
    }
  }, [topAmount, bottomAmoubnt]);
  const hanldeRemovePool = React.useCallback(async() => {
    try {
      const decimals = dex.toDecimails(dex.pools[token].decimals);
      const zildecimals = dex.toDecimails(12);
      const zil = topAmount.mul(zildecimals).round();
      const minTokens = bottomAmoubnt.mul(decimals).round();

      const res0 = await dex.removeLiquidity(
        zil,
        minTokens,
        zil,
        token
      );
      console.log(res0);
    } catch {
      ////
    }
  }, [topAmount, bottomAmoubnt]);

  React.useEffect(() => {
    dex.updateState(token, owner);
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
        <ContainerForm></ContainerForm>
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
