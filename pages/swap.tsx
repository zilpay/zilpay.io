import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Big from 'big.js';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container, Wrapper } from 'components/wrappers/terms-policy';

import { Text } from 'components/text';
import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

import { DragonDex, SwapDirection } from '@/mixins/dex';

Big.PE = 999;
const dex = new DragonDex();

const token = '0xd858528d4926ec6d17ff7cdde9c4cf1720806c2e';
const owner = '0xb72966338CDd4ed23a4E11C160dDBd060366F9ad';

export const PageSwap: NextPage = () => {
  const { t } = useTranslation(`main`);
  const [topAmount, setTopAmount] = React.useState(Big(0));
  const [bottomAmoubnt, setBottomAmoubnt] = React.useState(Big(0));
  const [direction, setDirection] = React.useState(SwapDirection.ZilToToken);


  const hanldeOnChangeTop = React.useCallback((event) => {
    try {
      const amount = Big(event.target.value);
      const circular = dex.zilToTokens(amount, token);

      setTopAmount(amount);
      setBottomAmoubnt(circular);
      setDirection(SwapDirection.ZilToToken);
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
      setDirection(SwapDirection.TokenToZil);
    } catch {
      ///
    }
  }, []);
  const hanldeOnSwap = React.useCallback(async() => {
    try {
      const contract = new DragonDex();
      const decimals = dex.toDecimails(dex.pools[token].decimals);
      const zildecimals = dex.toDecimails(12);

      switch (direction) {
        case SwapDirection.ZilToToken:
          const zil = topAmount.mul(zildecimals).round();
          const max_tokens = bottomAmoubnt.mul(decimals).round();
          const res0 = await contract.swapExactZILForTokens(
            zil,
            max_tokens,
            owner,
            token
          );
    
          console.log(res0);
        case SwapDirection.TokenToZil:
          const tokens = bottomAmoubnt.mul(decimals).round();
          const max_zil = topAmount.mul(zildecimals).round();
          const res = await contract.swapExactTokensForZIL(
            tokens,
            max_zil,
            owner,
            token
          );
    
          console.log(res);
          break;
      }
    } catch {
      ///
    }
  }, [topAmount, bottomAmoubnt, direction]);

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
        <input
          type="text"
          value={String(topAmount)}
          onChange={hanldeOnChangeTop}
        />
        <br />
        <input
          type="text"
          value={String(bottomAmoubnt)}
          onChange={hanldeOnChangeBottom}
        />
        <br />
        <button onClick={hanldeOnSwap}>
          swap
        </button>
      </Wrapper>
    </Container>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`main`, `common`]),
  },
});

export default PageSwap;
