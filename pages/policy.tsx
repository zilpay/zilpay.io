import { useTranslation } from 'next-i18next';
import React from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container, Dummy, Wrapper} from 'components/wrappers/terms-policy';

import { Text } from 'components/text';
import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

export const PolicyPage: NextPage = () => {
  const { t } = useTranslation(`policy`);

  return (
    <Container>
      <Head>
        <title>{t('head_title')}</title>
        <meta
          property="og:title"
          content={t('head_title')}
          key="title"
        />
      </Head>
      <Dummy />
      <Wrapper>
        <Text
          fontVariant={StyleFonts.Light}
          size="15px"
        >
          {t(`last_update`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`title`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p0`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p1`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p2`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p3`)}
        </Text>
        <Text>
          <strong>
            {t(`sub_title4`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p5`)}
        </Text>
        <Text>
          <strong>
            {t(`sub_title6`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p7`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p8`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p9`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p10`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p11`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p12`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p13`)}
        </Text>
        <Text>
          <strong>
            {t(`sub_title14`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p15`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p16`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p17`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p18`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p19`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p20`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p21`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p22`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p23`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p24`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p25`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p26`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p27`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p28`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p29`)}
        </Text>
        <Text>
          <strong>
            {t(`sub_title30`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p31`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p32`)}
        </Text>
        <Text>
          <strong>
            {t(`sub_title33`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p34`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p35`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p36`)}
        </Text>
        <Text>
          <strong>
            {t(`sub_title37`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p38`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p39`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p40`)}
        </Text>
        <Text>
          <strong>
            {t(`sub_title41`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p42`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p43`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p44`)}
        </Text>
        <Text>
          <strong>
            {t(`sub_title45`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p46`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p47`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p48`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p49`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p50`)}
        </Text>
        <Text>
          <strong>
            {t(`sub_title51`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p52`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p53`)}
        </Text>
        <Text>
          <strong>
            {t(`sub_title54`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p55`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p56`)}
        </Text>
        <Text>
          <strong>
            {t(`sub_title57`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p58`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p59`)}
        </Text>
        <Text>
          <strong>
            {t(`sub_title60`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p61`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p62`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p63`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p64`)}
        </Text>
        <Text>
          <strong>
            {t(`sub_title65`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p66`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p67`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p68`)}
        </Text>
      </Wrapper>
    </Container>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
    props: {
      ...await serverSideTranslations(props.locale || `en`, [`policy`, `common`]),
    },
  });

export default PolicyPage;
