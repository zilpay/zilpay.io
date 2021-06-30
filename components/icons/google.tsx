import React from 'react';

import { Colors } from '@/config/colors';

type Prop = {
  width: number | string;
  height: number | string;
  color: Colors;
  hoverColor?: Colors;
};

const GoogleIcon: React.FC<Prop> = ({
  width,
  height,
  color,
  hoverColor = Colors.White
}) => {
  const [hoverd, setHover] = React.useState(false);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <path d="M3 22V2L21 12L3 22Z" fill={hoverd ? hoverColor : color}/>
    </svg>
  );
};

export default GoogleIcon;
