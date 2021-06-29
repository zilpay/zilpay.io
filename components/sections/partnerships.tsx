import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

import { Text } from 'components/text';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

import { Container, HeaderWrapper } from './styles';

const Img = styled.img`
  border-radius: 100%;
`;

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 5,
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
    img: 'dragon-zil.svg',
    href: 'https://dragonzil.xyz/'
  },
  {
    img: 'partners_Switcheo.svg',
    href: 'https://www.switcheo.com'
  },
  {
    img: 'partners_UD.svg',
    href: 'https://unstoppabledomains.com/'
  },
  {
    img: 'partners_zillet.svg',
    href: 'https://zillet.io/'
  },
  {
    img: 'partners_Zilliqa.svg',
    href: 'https://www.zilliqa.com/'
  },
  {
    img: 'partners_zilswap.svg',
    href: 'https://zilswap.io'
  },
];

export const PartnershipsSection: React.FC = () => {
  return (
    <Container>
      <HeaderWrapper>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="40px"
        >
          Partnerships
        </Text>
        <Text
          fontVariant={StyleFonts.Medium}
          fontColors={Colors.Secondary}
          size="12px"
        >
          DRIVING TECHNOLOGY FOR LEADING BRANDS
        </Text>
      </HeaderWrapper>
      <Slider {...settings}>
        {list.map((el, index) => (
          <a
            key={index}
            href={el.href}
            style={{
              width: 'auto'
            }}
            target="_blank"
          >
            <Img
              src={`/icons/${el.img}`}
              height="200"
              width="200"
            />
          </a>
        ))}
      </Slider>
    </Container>
  );
};
