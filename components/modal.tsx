import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
  position: fixed;
  top: 20%;
  bottom: 20%;
  left: 30%;
  right: 30%;

  background-color: ${Colors.Dark};
  border-radius: 16px;
  padding: 30px;

  z-index: 30;

  @media (max-width: 1300px) {
    top: 30%;
    bottom: 30%;
    left: 20%;
    right: 20%;
  }

  @media (max-width: 600px) {
    top: 20%;
    bottom: 20%;
    left: 10%;
    right: 10%;
  }
`;
const BackDrop = styled.a`
  cursor: pointer;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.4);

  z-index: 22;
`;
type Prop = {
  show: boolean;
  onClose: () => void;
};

export const Modal: React.FC<Prop> = ({ children, show, onClose }) => {
  if (show) {
    return (
      <>
        <Container>
          {children}
        </Container>
        <BackDrop onClick={onClose}/>
      </>
    );
  }

  return null;
};
