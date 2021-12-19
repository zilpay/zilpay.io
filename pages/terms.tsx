import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Text } from 'components/text';
import { Container, Dummy, Wrapper} from 'components/wrappers/terms-policy';
import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';


export const TermsPage: NextPage = () => {
  const { t } = useTranslation(`terms`);

  return (
    <Container>
      <Dummy />
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
        <Text>
          <strong>
            {t(`sub_title0`)}
          </strong>
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
        <Text fontVariant={StyleFonts.Light}>
          {t(`p4`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title1`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p5`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p6`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title2`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p6`)}
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
        <Text>
          <strong>
            {t(`subt_title3`)}
          </strong>
        </Text>
        <Text>
          <strong>
            {t(`subt_title4`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p11`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title5`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p12`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title6`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p13`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title7`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p14`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title8`)}
          </strong>
        </Text>
        <Text>
          <strong>
            {t(`subt_title9`)}
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
        <Text>
          <strong>
            {t(`subt_title10`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p18`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title11`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p19`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title12`)}
          </strong>
        </Text>
        <Text>
          <strong>
            {t(`subt_title13`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p20`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p21`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title14`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p22`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p23`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title15`)}
          </strong>
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
        <Text>
          <strong>
            {t(`subt_title16`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p27`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title17`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p28`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p29`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title18`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p30`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title19`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p31`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title20`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p32`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title21`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p33`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title22`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p34`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title23`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p35`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title24`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p36`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p37`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p38`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title25`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p39`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p40`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title26`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p41`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p42`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title27`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          <strong>
            {t(`subt_title28`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p43`)}
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p44`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title29`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p45`)}
        </Text>
        <Text>
          <strong>
            {t(`subt_title30`)}
          </strong>
        </Text>
        <Text fontVariant={StyleFonts.Light}>
          {t(`p46`)}
        </Text>
      </Wrapper>
    </Container>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
    props: {
      ...await serverSideTranslations(props.locale || `en`, [`terms`, `common`]),
    },
  });

export default TermsPage;
