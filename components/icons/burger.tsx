import React from 'react';
import styled from 'styled-components';

import { Colors } from '@/config/colors';


type ContainerProp = {
  width: number | string;
  height: number | string;
};

type LineProp = {
  color: Colors | string;
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  height: ${(p: ContainerProp) => p.height}px;
  width: ${(p: ContainerProp) => p.width}px;
`;
const Line = styled.div`
  height: 2px;
  background: ${(p: LineProp) => p.color};
  border-radius: 30px;
`;

type Prop = {
  width: number | string;
  height: number | string;
  color?: Colors;
  onClick: () => void;
};

const BurgerIcon: React.FC<Prop> = ({
  width,
  height,
  color = Colors.Primary,
  onClick
}) => (
    <Container
      onClick={onClick}
      width={width}
      height={height}
    >
      <Line color={color}/>
      <Line color={color}/>
      <Line color={color}/>
    </Container>
  );

export default BurgerIcon;
