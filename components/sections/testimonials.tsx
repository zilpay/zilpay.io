import React from 'react';
import Slider from 'react-slick';

import { Text } from 'components/text';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

import { Container, HeaderWrapper } from './styles';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 5
};
export const TestimonialsSection: React.FC = () => {
  return (
    <Container>
      <HeaderWrapper>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="40px"
        >
          Testimonials
        </Text>
      </HeaderWrapper>
      <Slider {...settings}>

      </Slider>
    </Container>
  );
};
