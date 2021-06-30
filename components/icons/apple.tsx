import React from 'react';

import { Colors } from '@/config/colors';

type Prop = {
  width: number | string;
  height: number | string;
  color: Colors;
  hoverColor?: Colors;
};

const AppleIcon: React.FC<Prop> = ({
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
        d="M22 17.607C21.214 19.887 18.861 23.924 16.437 23.968C14.829 23.999 14.312 23.015 12.474 23.015C10.637 23.015 10.062 23.938 8.542 23.998C5.97 24.097 2 18.171 2 13.003C2 8.256 5.308 5.903 8.198 5.86C9.748 5.832 11.212 6.905 12.157 6.905C13.106 6.905 14.884 5.615 16.753 5.804C17.535 5.837 19.732 6.119 21.142 8.181C17.401 10.623 17.984 15.73 22 17.607ZM16.778 0C13.952 0.114 11.646 3.079 11.968 5.531C14.58 5.734 17.086 2.806 16.778 0Z"
        fill={hoverd ? hoverColor : color}
      />
    </svg>
  );
};

export default AppleIcon;
