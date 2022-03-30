import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

type ContainerProp = {
  image: string;
};

const Container = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  width: 290px;
  height: 290px;

  margin: 16px;

  float: left;
  overflow: hidden;
  transition: all 0.4s;

  background-color: ${Colors.Card};
  background-image: url(${(p: ContainerProp) => p.image});
  background-size: cover;
  background-position: 50%;

  :hover {
    background-size: 700px;
    background-position: 40%;
  }

  @media (max-width: 1000px) {
    width: 80vw;
  }
`;

type Prop = {
  url: string;
  href: string;
  title: string;
  onClick?: (url: string) => void;
};

export const ZoomCard: React.FC<Prop> = ({
  url,
  title,
  href,
  children,
  onClick = () => null
}) => (
    <Container
      image={url}
      onClick={() => onClick(href)}
    >
      <Text
        fontColors={Colors.Text}
        fontVariant={StyleFonts.Bold}
        size="24px"
      >
        {title}
      </Text>
      <Text
        fontColors={Colors.Text}
        fontVariant={StyleFonts.SemiBold}
        size="14px"
      >
        {children}
      </Text>
    </Container>
  );
