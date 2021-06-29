import React from 'react';

import { Colors } from '@/config/colors';

type Prop = {
  width: number | string;
  height: number | string;
  color: Colors;
};

export const GoogleIcon: React.FC<Prop> = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M3 22V2L21 12L3 22Z" fill={color}/>
    </svg>
  );
};
