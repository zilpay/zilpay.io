import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container, Wrapper } from 'components/wrappers/terms-policy';

import { Text } from 'components/text';
import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

export const PageNotFound: NextPage = () => {
  const { t } = useTranslation(`404`);

  return (
    <Container>
      <Head>
        <title>{t(`head_title`)}</title>
        <meta
          property="og:title"
          content={t(`head_title`)}
          key="title"
        />
      </Head>
      <Wrapper>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="80px"
          css="text-align: center;"
        >
          {t(`title`)}
        </Text>
        <Text
          fontColors={Colors.White}
          css="text-align: center;"
        >
          {t(`sub_title`)}
        </Text>
      </Wrapper>
    </Container>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`404`, `common`]),
  },
});

export default PageNotFound;
