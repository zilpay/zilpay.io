import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import styled from 'styled-components';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Text } from 'components/text';
import { Button } from 'components/button';
import { PreviewImg } from 'components/preview-img';

import { AnApp } from 'mixins/explorer';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { IPFS } from 'config/ipfs';
import { sliderProps } from 'config/slider';
import { LOCAL_URL } from 'config/api';

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

type prop = {
  application: AnApp;
}

export const AppPage: NextPage<prop> = ({
  application
}) => {
  const { t } = useTranslation(`explorer`);
  const [description, setDescription] = React.useState<string>(``);

  React.useEffect(() => {
    if (application) {
      fetch(`${IPFS}/${application.description}`)
        .then((res) => res.json())
        .then((des) => setDescription(des.text));
    }
  }, [application]);

  return (
    <>
      <Head>
        <title>{application?.title} - ZilPay</title>
        <meta
          property="og:title"
          content={`${application?.title} - ZilPay`}
          key="title"
        />
      </Head>
      <Container>
        <TitleWrapper>
          {application ? (
            <img
              src={`${IPFS}/${application.icon}`}
              alt="logo"
              height="100"
            />
          ) : null}
          <Text
            fontVariant={StyleFonts.Bold}
            fontColors={Colors.White}
            size="40px"
            css="text-indent: 40px;"
          >
            {application?.title}
          </Text>
        </TitleWrapper>
        <Wrapper>
          {application ? (
            <div>
              <Slider {...sliderProps}>
                {application.images.map((image) => (
                  <PreviewImg
                    key={image}
                    src={`${IPFS}/${image}`}
                    alt="preview"
                  />
                ))}
              </Slider>
            </div>
          ) : null}
          <Text
            size="20px"
            css="text-align: center;margin: 30px;max-width: 700px;"
          >
            {description}
          </Text>
          {application ? (
            <a
              href={application?.url}
              target="_blank" rel="noreferrer"
            >
              <Button upperCase>
                {t(`launch_btn`)}
              </Button>
            </a>
          ) : null}
        </Wrapper>
      </Container>
    </>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => {
  let application = {};
  const category = String(props.params && props.params.category);
  const owner = String(props.params && props.params.app);

  try {
    const res = await fetch(`${LOCAL_URL}/apps/${category}/${owner}`);
    application = await res.json();
  } catch {
    //
  }

  return {
    props: {
      application,
      ...await serverSideTranslations(props.locale || `en`, [`explorer`, `common`]),
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [
    ],
    fallback: true
  }
}

export default AppPage;
