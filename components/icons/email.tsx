import React from 'react';

import { Colors } from '@/config/colors';

type Prop = {
  width: number | string;
  height: number | string;
  color: Colors;
  hoverColor?: Colors;
};

export const EmailIcon: React.FC<Prop> = ({
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
      <path
        d="M12 12.713L0.015 3H23.986L12 12.713ZM6.575 10.891L0 5.562V18.063L6.575 10.891ZM17.425 10.891L24 18.063V5.562L17.425 10.891ZM15.868 12.152L12 15.287L8.132 12.152L0.022 21H23.978L15.868 12.152V12.152Z"
        fill={hoverd ? hoverColor : color}
      />
    </svg>
  );
};
