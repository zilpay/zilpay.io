import React from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button } from 'components/button';

import { Banner } from 'mixins/explorer';
import { Categories } from 'config/categories';
 
const AppCard = dynamic(import(`components/app-card`));

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  div > .slick-slider {
    width: 90vw;
    max-width: initial;
  }
`;
const AppsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  max-width: 1200px;
  margin-top: 40px;
`;
const SubmitWrapper = styled.div`
  display: flex;
  margin: 30px;

  div {
    margin: 10px;
  }
`;

type Prop = {
  adsList: Banner[];
}

const list = [
  Categories.Games,
  Categories.Finance,
  Categories.Social,
  Categories.HighRisk,
  Categories.Exchange,
  Categories.Gambling
];
export const ExplorerMainPage: NextPage<Prop> = () => {
  const { t } = useTranslation(`explorer`);

  return (
    <>
      <Head>
        <title>{t(`head_title`)}</title>
        <meta
          property="og:title"
          content={t(`head_title`)}
          key="title"
        />
      </Head>
      <Container>
        <AppsWrapper>
          {list.map((el) => (
            <Link
              key={el}
              href={`/explorer/${el}`}
            >
              <div>
                <AppCard
                  url={`/images/categories/${el}.webp`}
                  title={t(`cat_${el}`)}
                />
              </div>
            </Link>
          ))}
        </AppsWrapper>
        <SubmitWrapper>
          <Link href="/explorer/submit/banner">
            <Button>
              {t(`submit_ad`)}
            </Button>
          </Link>
          <Link href="/explorer/submit/app">
            <Button>
              {t(`submit_app`)}
            </Button>
          </Link>
        </SubmitWrapper>
      </Container>
    </>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
    props: {
      ...await serverSideTranslations(props.locale || `en`, [`explorer`, `common`]),
    },
  })


export default ExplorerMainPage;
