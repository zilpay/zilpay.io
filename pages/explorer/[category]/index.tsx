import React from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import { Text } from 'components/text';

import { useZilPay } from 'mixins/zilpay';
import { Explorer, AnApp } from 'mixins/explorer';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { IPFS } from 'config/ipfs';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60vh;
`;
const Item = styled.div`
  display: flex;

  background-color: ${Colors.Dark};
  border-radius: 8px;
  border-style: solid;
  border-width: 2px;

  max-width: 500px;
  width: 100%;

  padding: 10px;
  margin: 5px;

  cursor: pointer;

  :hover {
    border-color: ${Colors.Secondary};
  }
`;
const TextCardWrapper = styled.div`
  text-indent: 50px;
`;

export const CategoryPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation(`explorer`);
  const zilpay = useZilPay();
  const [items, setItems] = React.useState<AnApp[]>([]);

  React.useEffect(() => {
    if (zilpay.instance && router.query.category) {
      const explorer = new Explorer(zilpay.instance);

      explorer
        .getApplicationList(Number(router.query.category))
        .then((values) => setItems(values));
    }
  }, [zilpay, router.query.category]);

  return (
    <>
      <Head>
        <title>{t(`cat_${router.query.category}`)} - ZilPay</title>
        <meta
          property="og:title"
          content={t(`cat_${router.query.category} - ZilPay`)}
          key="title"
        />
      </Head>
      <Container>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="40px"
          css="text-indent: 40px;"
        >
          {t(`cat_${router.query.category}`)}
        </Text>
        <Wrapper>
          {items.length === 0 ? (
            <Text size="25px">
              {t(`no_apps`)}
            </Text>
          ) : null}
          {items.map((el) => (
            <Link
              key={el.url}
              href={`/explorer/${router.query.category}/${el.owner}`}
            >
              <Item>
                <img
                  src={`${IPFS}/${el.icon}`}
                  alt="logo"
                  height="50"
                />
                <TextCardWrapper>
                  <Text
                    fontVariant={StyleFonts.Bold}
                    fontColors={Colors.White}
                    css="margin: 0;"
                  >
                    {el.title}
                  </Text>
                  <Text css="margin: 0;">
                    {new URL(el.url).host}
                  </Text>
                </TextCardWrapper>
              </Item>
            </Link>
          ))}
        </Wrapper>
      </Container>
    </>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`explorer`, `common`]),
  },
});

export async function getStaticPaths() {
  return {
    paths: [
    ],
    fallback: true
  }
}

export default CategoryPage;
