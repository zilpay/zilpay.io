import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
  align-content: flex-start;
  align-items: flex-start;

  width: 250px;

  background-color: ${Colors.Dark};

  margin: 5px;
  padding: 35px 35px 35px 35px;

  border-style: solid;
  border-width: 2px 2px 2px 2px;

  :hover {
    border-color: ${Colors.Secondary};
  }

  box-shadow: 0px 0px 25px 0px rgb(0 0 0 / 9%);
  transition: background 0.3s, border 0.5s, border-radius 0.5s, box-shadow 0.5s;

  @media (max-width: 1000px) {
    width: auto;
  }
`;
const ImageContainer = styled.img`
  width: 200px;
`;

type Prop = {
  url: string;
  title: string;
};

export const AppCard: React.FC<Prop> = ({ url, title }) => (
    <Container>
      <ImageContainer
        src={url}
        alt="image"
      />
      <Text
        fontColors={Colors.White}
        fontVariant={StyleFonts.SemiBold}
        size="22px"
      >
        {title}
      </Text>
    </Container>
  );
