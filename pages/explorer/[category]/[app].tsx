import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Text } from 'components/text';
import { Button } from 'components/button';

import { useZilPay } from 'mixins/zilpay';
import { Explorer, AnApp } from 'mixins/explorer';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { IPFS } from 'config/ipfs';

const Slider = dynamic(import(`react-slick`));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  margin-bottom: 100px;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 30px;

  div > .slick-slider {
    width: 90vw;
    max-width: initial;
  }
`;
const PreviewImg = styled.img`
  height: 500px
  width: auto;
  border-radius: 8px;
`;

const settings = {
  className: `center`,
  centerMode: true,
  infinite: true,
  centerPadding: `60px`,
  speed: 500,
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
export const AppPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation(`explorer`);
  const zilpay = useZilPay();
  const [app, setApp] = React.useState<AnApp | null>(null);
  const [description, setDescription] = React.useState<string>(``);

  React.useEffect(() => {
    if (zilpay.instance) {
      const explorer = new Explorer(zilpay.instance);
      const { category } = router.query;

      explorer
        .getApplication(Number(category), String(router.query.app))
        .then((e) => {
          setApp(e);

          if (!e || !e.description) {
            throw new Error();
          }

          return fetch(`${IPFS}/${e?.description}`);
        })
        .then((res) => res.text())
        .then((des) => setDescription(des))
        .catch(() => null);
    }
  }, [zilpay, router.query.category]);

  return (
    <>
      <Head>
        <title>{app?.title} - ZilPay</title>
        <meta
          property="og:title"
          content={`${app?.title} - ZilPay`}
          key="title"
        />
      </Head>
      <Container>
        <TitleWrapper>
          <img
            src={`${IPFS}/${app?.icon}`}
            alt="logo"
            height="100"
          />
          <Text
            fontVariant={StyleFonts.Bold}
            fontColors={Colors.White}
            size="40px"
            css="text-indent: 40px;"
          >
            {app?.title}
          </Text>
        </TitleWrapper>
        <Wrapper>
          <div>
            <Slider {...settings}>
              {app?.images.map((image) => (
                <PreviewImg
                  src={`${IPFS}/${image}`}
                  alt="preview"
                />
              ))}
            </Slider>
          </div>
          <Text
            size="20px"
            css="text-align: center;margin: 30px;max-width: 700px;"
          >
            {description}
          </Text>
          <a
            href={app?.url}
            target="_blank" rel="noreferrer"
          >
            <Button upperCase>
              {t(`launch_btn`)}
            </Button>
          </a>
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

export default AppPage;
