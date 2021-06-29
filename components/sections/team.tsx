import React from 'react';

import { Text } from 'components/text';

import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

import { Container, HeaderWrapper, Wrapper } from './styles';

export const TeamSection: React.FC = () => {
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
      <Wrapper>
      </Wrapper>
    </Container>
  );
};
