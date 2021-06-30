import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

type ContainerProp = {
  selected: boolean;
};

const Container = styled.div`
  align-content: flex-start;
  align-items: flex-start;

  width: 250px;
  height: 300px;

  background-color: ${Colors.Dark};

  margin: 5px;
  padding: 35px 35px 35px 35px;

  border-style: solid;
  border-width: 2px 2px 2px 2px;
  ${(p: ContainerProp) => p.selected ? `border-color: ${Colors.Secondary};` : ``}

  :hover {
    border-color: ${Colors.Secondary};
  }

  box-shadow: 0px 0px 25px 0px rgb(0 0 0 / 9%);
  transition: background 0.3s, border 0.5s, border-radius 0.5s, box-shadow 0.5s;

  @media (max-width: 1000px) {
    width: auto;
  }
`;

type Prop = {
  url: string;
  title: string;
  selected?: boolean;
};

export const Card: React.FC<Prop> = ({ url, selected, title, children }) => (
    <Container selected={Boolean(selected)}>
      <img
        src={url}
        height="60"
        width="60"
        alt="Icon"
      />
      <Text
        fontColors={Colors.White}
        fontVariant={StyleFonts.SemiBold}
        size="22px"
      >
        {title}
      </Text>
      <Text size="16px">
        {children}
      </Text>
    </Container>
  );
