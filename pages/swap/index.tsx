import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container, Wrapper } from 'components/wrappers/terms-policy';
import { BorderContainer } from '@/components/swap/form';

import { Text } from 'components/text';
import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

import { DragonDex } from '@/mixins/dex';

const dex = new DragonDex();

export const PageSwap: NextPage = () => {
  const { t } = useTranslation(`main`);

  const [tab, setTab] = React.useState(0);


  React.useEffect(() => {
    const token = '0x5c98730c74e9c12725798a77be8b29c624d89cb3';
    const owner = '0x8617b72e22090f0c13167865147ec48a6db788ff';

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
          <div>
            <Text onClick={() => setTab(0)}>Swap</Text>
            <Text onClick={() => setTab(1)}>Pool</Text>
          </div>
          {tab === 0 ? (
            <BorderContainer>
              Swaping
            </BorderContainer>
          ) : (
            <BorderContainer>
              LP
            </BorderContainer>
          )}
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

export default PageSwap;
