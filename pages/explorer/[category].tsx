import React from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useZilPay } from 'mixins/zilpay';
import { Explorer, AnApp } from 'mixins/explorer';

export const CategoryPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation(`explorer`);
  const zilpay = useZilPay();
  const [items, setItems] = React.useState<AnApp[]>([]);

  React.useEffect(() => {
    if (zilpay.instance && items.length === 0) {
      const explorer = new Explorer(zilpay.instance);

      explorer
        .getApplicationList(Number(router.query.category))
        .then((values) => setItems(values));
    }
  }, [zilpay]);

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
      '/explorer/[category]',
      {
        params: {
          category: '0'
        }
      }
    ],
    fallback: true
  }
}

export default CategoryPage;
