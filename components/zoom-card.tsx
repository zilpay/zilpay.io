import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { Text } from 'components/text';
import { Button } from 'components/button';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
`;

type Prop = {
  url: string;
  title: string;
};

export const ZoomCard: React.FC<Prop> = ({ url, title, children }) => {
  return (
    <Container>
    </Container>
  );
};
