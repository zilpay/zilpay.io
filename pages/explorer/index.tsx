import React from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import styled from 'styled-components';

import Slider from 'react-slick';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Wrapper } from 'components/wrappers/terms-policy';
import { AppCard } from 'components/app-card';

import { useZilPay } from 'mixins/zilpay';
import { Explorer, Banner } from 'mixins/explorer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div > .slick-slider {
    width: 90vw;
    max-width: initial;
  }
`;
const BannerImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 8px;
`;
const BannerLink = styled.a`
  display: flex;
  justify-content: center;
`;
const AppsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  max-width: 1200px;
  margin-top: 40px;
`;

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
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
const list = [
  {
    name: 'Games',
    category: 0
  },
  {
    name: 'Finance',
    category: 1
  },
  {
    name: 'Social',
    category: 2
  },
  {
    name: 'High-Risk',
    category: 3
  },
  {
    name: 'Exchange',
    category: 4
  },
  {
    name: 'Gambling',
    category: 5
  }
];
export const ExplorerMainPage: NextPage = () => {
  const { t } = useTranslation(`explorer`);
  const zilpay = useZilPay();
  const [items, setItems] = React.useState<Banner[]>([]);

  React.useEffect(() => {
    if (zilpay.instance) {
      const explorer = new Explorer(zilpay.instance);

      explorer
        .getBannerList()
        .then((values) => setItems(values));
    }
  }, [zilpay]);

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
        <div>
          <Slider {...settings}>
            {items.map((el, index) => (
              <div key={index}>
                <BannerLink
                  href={el.url}
                  target="_blank"
                >
                  <BannerImage
                    src={`https://ipfs.io/ipfs/${el.ipfs}`}
                    alt="banner"
                  />
                </BannerLink>
              </div>
            ))}
          </Slider>
        </div>
        <AppsWrapper>
            {list.map((el, index) => (
              <AppCard
                key={index}
                url={`/images/${el.name}.webp`.toLowerCase()}
                title={el.name}
              />
            ))}
          </AppsWrapper>
      </Container>
    </>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`explorer`, `common`]),
  },
});

export default ExplorerMainPage;
