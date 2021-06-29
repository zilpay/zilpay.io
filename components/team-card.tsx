import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';
import {
  GitHubIcon,
  LinkedinIcon,
  TwitterIcon
} from 'components/icons';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 50px;
`;
const Avatar = styled.img`
  border-radius: 100%;
`;
const Span = styled.span`
  width: 30px;
  border: solid 1px ${Colors.Secondary};
`;
const IconsWrapper = styled.div`
  margin: 10px;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

type Prop = {
  img: string;
  title: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
};

export const TeamCard: React.FC<Prop> = ({
  img,
  title,
  children,
  github,
  linkedin,
  twitter
}) => {
  return (
    <Container>
      <Avatar
        src={img}
        width="200"
        height="200"
      />
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
        {children}
      </Text>
      <Span />
      <IconsWrapper>
        {github ? (
          <a
            href={github}
            target="_blank"
          >
            <GitHubIcon
              color={Colors.White}
              height="15"
              width="15"
            />
          </a>
        ) : null}
        {linkedin ? (
          <a
            href={linkedin}
            target="_blank"
          >
            <LinkedinIcon
              color={Colors.White}
              height="15"
              width="15"
            />
          </a>
        ) : null}
        {twitter ? (
          <a
            href={twitter}
            target="_blank"
          >
            <TwitterIcon
              color={Colors.White}
              height="15"
              width="15"
            />
          </a>
        ) : null}
      </IconsWrapper>
    </Container>
  );
};
