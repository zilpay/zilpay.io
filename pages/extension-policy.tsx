import { useTranslation } from 'next-i18next';
import React from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container, Dummy, Wrapper} from 'components/wrappers/terms-policy';

import { Text } from 'components/text';
import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

export const ExtensionPolicyPage: NextPage = () => {
  const { t } = useTranslation(`extension-policy`);

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
          fontColors={Colors.Primary}
          size="45px"
        >
          {t(`head_title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          size="25px"
        >
          <strong>
            {t(`title0`)}
          </strong>
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p1`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p2`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p3`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          size="25px"
        >
          <strong>
            {t(`title1`)}
          </strong>
        </Text>
        <ul>
          <li>
            <Text fontVariant={StyleFonts.Light}>
              {t(`collections0`)}
            </Text>
          </li>
          <li>
            <Text fontVariant={StyleFonts.Light}>
              {t(`collections1`)}
            </Text>
          </li>
        </ul>
        <Text
          fontVariant={StyleFonts.Bold}
          size="25px"
        >
          <strong>
            {t(`title2`)}
          </strong>
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p4`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          size="25px"
        >
          <strong>
            {t(`title3`)}
          </strong>
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p5`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p6`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p7`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p8`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          size="25px"
        >
          <strong>
            {t(`title4`)}
          </strong>
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p9`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p10`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          size="25px"
        >
          <strong>
            {t(`title5`)}
          </strong>
        </Text>
        <ul>
          <li>
            <Text fontVariant={StyleFonts.Light}>
              {t(`stores0`)}
            </Text>
          </li>
          <li>
            <Text fontVariant={StyleFonts.Light}>
              {t(`stores1`)}
            </Text>
          </li>
          <li>
            <Text fontVariant={StyleFonts.Light}>
              {t(`stores2`)}
            </Text>
          </li>
          <li>
            <Text fontVariant={StyleFonts.Light}>
              {t(`stores3`)}
            </Text>
          </li>
          <li>
            <Text fontVariant={StyleFonts.Light}>
              {t(`stores4`)}
            </Text>
          </li>
          <li>
            <Text fontVariant={StyleFonts.Light}>
              {t(`stores5`)}
            </Text>
          </li>
        </ul>
        <Text
          fontVariant={StyleFonts.Bold}
          size="25px"
        >
          <strong>
            {t(`title6`)}
          </strong>
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p11`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          size="25px"
        >
          <strong>
            {t(`title7`)}
          </strong>
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p12`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          size="25px"
        >
          <strong>
            {t(`title8`)}
          </strong>
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p13`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          size="25px"
        >
          <strong>
            {t(`title9`)}
          </strong>
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`p14`)}
        </Text>
      </Wrapper>
    </Container>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
    props: {
      ...await serverSideTranslations(props.locale || `en`, [`extension-policy`, `common`]),
    },
  });

export default ExtensionPolicyPage;
