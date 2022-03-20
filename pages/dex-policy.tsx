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
  const { t } = useTranslation(`dex-policy`);

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
          fontColors={Colors.White}
          size="45px"
        >
          {t(`head_title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part0.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part0.p1`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part0.p2`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part1.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part1.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part2.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part2.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part2.p1`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part3.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part3.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part4.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part4.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part5.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part5.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part5.p1`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part5.p2`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part6.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part6.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part6.p1`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part6.p2`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part6.p3`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part6.p4`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part6.p5`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part6.p6`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part6.p7`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part6.p8`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part7.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part7.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part7.p1`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part8.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part8.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part9.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part9.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part10.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part10.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part11.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part11.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part11.p1`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part12.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part12.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part13.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part13.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part14.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part14.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part15.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part15.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part16.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part16.p0`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="45px"
        >
          {t(`part17.title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Light}
          css="margin-left: 15px;"
        >
          {t(`part17.p0`)}
        </Text>
      </Wrapper>
    </Container>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
    props: {
      ...await serverSideTranslations(props.locale || `en`, [`dex-policy`, `common`]),
    },
  });

export default ExtensionPolicyPage;
