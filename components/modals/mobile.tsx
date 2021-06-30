import React from 'react';
import styled from 'styled-components';

import { Colors } from '@/config/colors';

type ContainerProp = {
  show: boolean;
  color?: Colors | string;
};

const Container = styled.aside`
  position: fixed;
  left: 0;
  right: 0;

  min-height: 40vh;

  background-color: ${(p: ContainerProp) => p.color};

  z-index: 10;

  display: ${(p: ContainerProp) => p.show ? `block` : `none`};

  transition: all 0.4s;
`;
const Closer = styled.a`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;

  cursor: pointer;

  background-color: ${Colors.Black};
  z-index: 5;

  animation: fade 0.4s;
  animation-timing-function: cubic-bezier(.3,.17,.23,.96);

  opacity: 0.5;

  display: ${(p: ContainerProp) => p.show ? `block` : `none`};
`;

type Prop = {
  onClose: () => void;
  show: boolean;
  color: Colors | string;
};

export const MobileModal: React.FC<Prop> = ({ children, onClose, show, color }) => (
    <>
      <Container
        show={show}
        color={color}
      >
        {children}
      </Container>
      <Closer
        show={show}
        onClick={onClose}
      />
    </>
  );
