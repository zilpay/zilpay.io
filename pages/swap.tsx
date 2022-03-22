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

import { DragonDex } from '@/mixins/dex';
import { DexContract } from '@/mixins/dex-contract';

Big.PE = 999;
const dex = new DragonDex();

const token = '0xd858528d4926ec6d17ff7cdde9c4cf1720806c2e';
const owner = '0xb72966338CDd4ed23a4E11C160dDBd060366F9ad';

let observer: any = null;
let observerNet: any = null;
let observerBlock: any = null;

export const PageSwap: NextPage = () => {
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
  const hanldeOnSwap = React.useCallback(async() => {
    // try {
    //   if (zilpay.instance) {
    //     const contract = new DexContract(zilpay.instance);
    //     const decimals = dex.toDecimails(dex.pools[token].decimals);
    //     const zil = topAmount.mul(dex.toDecimails(12)).round();
    //     const max_tokens = bottomAmoubnt.mul(decimals).round();

    //     const res = await contract.swapExactZILForTokens(
    //       zil,
    //       max_tokens,
    //       owner,
    //       token
    //     );

    //     console.log(res);
    //   }
    // } catch {
    //   ///
    // }
  }, [topAmount, bottomAmoubnt]);

  const hanldeObserverState = React.useCallback(
    (zp) => {
      if (observerNet) {
        observerNet.unsubscribe();
      }
      if (observer) {
        observer.unsubscribe();
      }
      if (observerBlock) {
        observerBlock.unsubscribe();
      }

      observerNet = zp.wallet.observableNetwork().subscribe((net: string) => {
        console.log(net);
      });

      observer = zp.wallet.observableAccount().subscribe((acc: any) => {
        console.log(acc);
      });

      observerBlock = zp.wallet
        .observableBlock()
        .subscribe((block: any) => {
          console.log(block);
        });

      if (zp.wallet.defaultAccount) {
        // updateAddress(zp.wallet.defaultAccount);
      }
    },
    []
  );

  React.useEffect(() => {
    dex.updateState(token, owner);

    return () => {
      if (observer) {
        observer.unsubscribe();
      }
      if (observerNet) {
        observerNet.unsubscribe();
      }
      if (observerBlock) {
        observerBlock.unsubscribe();
      }
    };
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
