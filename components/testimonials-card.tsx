import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { Text } from 'components/text';
import { Button } from 'components/button';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
  width: 559px;
  margin: 16px;
`;
const Avatar = styled.img`
  border-radius: 100%;
`;

type Prop = {
  img: string;
  title: string;
  info: string;
};

export const TestimonialsCard: React.FC<Prop> = ({ img, info, title, children }) => {
  return (
    <Container>
      <Avatar
        src={img}
        width="80"
        height="80"
      />
      <Text
        fontColors={Colors.White}
        fontVariant={StyleFonts.Light}
        size="16px"
      >
        {children}
      </Text>
      <Text
        fontColors={Colors.White}
        fontVariant={StyleFonts.Bold}
        size="25px"
      >
        {title}
      </Text>
      <Text
        fontVariant={StyleFonts.Light}
        size="15px"
      >
        {info}
      </Text>
    </Container>
  );
};
