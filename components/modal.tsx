import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
`;
const CloseWrapper = styled.a`
`;
type Prop = {
  onClose: () => void;
};

export const Modal: React.FC<Prop> = ({ onClose }) => {
  return (
    <>
      <Container>
      </Container>
      <CloseWrapper />
    </>
  );
};
