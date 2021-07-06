import React from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'next-i18next';

import { Text } from 'components/text';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

import { Container, HeaderWrapper, Wrapper } from './styles';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 5,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
const list = [
  {
    img: `dragon-zil.svg`,
    href: `https://dragonzil.xyz/`
  },
  {
    img: `partners_Switcheo.svg`,
    href: `https://www.switcheo.com`
  },
  {
    img: `partners_UD.svg`,
    href: `https://unstoppabledomains.com/`
  },
  {
    img: `partners_zillet.svg`,
    href: `https://zillet.io/`
  },
  {
    img: `partners_Zilliqa.svg`,
    href: `https://www.zilliqa.com/`
  },
  {
    img: `partners_zilswap.svg`,
    href: `https://zilswap.io`
  },
];

export const PartnershipsSection: React.FC = () => {
  const { t } = useTranslation(`main`);
  return (
    <Container id="partnerships">
      <HeaderWrapper>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="40px"
        >
          {t(`partnerships_title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Medium}
          fontColors={Colors.Secondary}
          size="12px"
        >
          {t(`partnerships_sub_title`)}
        </Text>
      </HeaderWrapper>
      <Wrapper>
        <Slider {...settings} useCSS>
          {list.map((el, index) => (
            <div key={index}>
              <a
                href={el.href}
                style={{
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `center`,
                }}
                target="_blank" rel="noreferrer"
              >
                <img
                  src={`/icons/${el.img}`}
                  style={{
                    borderRadius: `100%`
                  }}
                  height="150"
                  width="150"
                  alt="Ava"
                />
              </a>
            </div>
          ))}
        </Slider>
      </Wrapper>
    </Container>
  );
};

export default PartnershipsSection;
