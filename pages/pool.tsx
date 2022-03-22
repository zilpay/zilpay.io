import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React from 'react';
import Big from 'big.js';

import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container, Wrapper } from 'components/wrappers/terms-policy';

import { Text } from 'components/text';
import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';
import { SwapDirection, DragonDex } from '@/mixins/dex';

Big.PE = 999;
const dex = new DragonDex();

const token = '0xd858528d4926ec6d17ff7cdde9c4cf1720806c2e';
const owner = '0xb72966338CDd4ed23a4E11C160dDBd060366F9ad';

export const PagePool: NextPage = () => {
  const { t } = useTranslation(`main`);

  const [direction, setDirection] = React.useState(SwapDirection.ZilToToken);
  const [firstAmount, setFirstAmount] = React.useState(Big(0));
  const [secondAmount, setSecondAmount] = React.useState(Big(0));

  const hanldeChangeFirst = React.useCallback((event) => {
    try {
      setDirection(SwapDirection.ZilToToken);
      const amount = Big(event.target.value);
      setFirstAmount(amount);

      const decimals = Big(10**dex.pools[token].decimals);
      const zilDecimails = Big(10**12);
      const qa = amount.mul(zilDecimails).round().toString();
      const { tokens } = dex.calcAmount(BigInt(qa), token, SwapDirection.ZilToToken);
      const circular = Big(String(tokens)).div(decimals);

      setSecondAmount(circular);
    } catch {
      /// skip
    }
  }, []);
  const hanldeChangeSecond = React.useCallback((event) => {
    try {
      setDirection(SwapDirection.TokenToZil);
      const amount = Big(event.target.value);
      setSecondAmount(amount);

      const decimals = Big(10**dex.pools[token].decimals);
      const zilDecimails = Big(10**12);
      const qa = amount.mul(decimals).round().toString();
      const { zils } = dex.calcAmount(BigInt(qa), token, SwapDirection.TokenToZil);
      const circular = Big(String(zils)).div(zilDecimails);

      setFirstAmount(circular);
    } catch {
      /// skip
    }
  }, []);


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
        <div>
          <input
            type="text"
            value={String(firstAmount)}
            onChange={hanldeChangeFirst}
          />
          <br />
          <input
            type="text"
            value={String(secondAmount)}
            onChange={hanldeChangeSecond}
          />
          <br />
          <button>
            Add Pool
          </button>
        </div>
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
