import React from 'react';

import { Colors } from '@/config/colors';

type Prop = {
  width: number | string;
  height: number | string;
  color: Colors;
  hoverColor?: Colors;
};

const ChromeIcon: React.FC<Prop> = ({
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
      <g clipPath="url(#clip0)">
        <path
          d="M2.897 4.181C5.327 1.353 8.66 0 11.969 0C16.257 0 20.504 2.273 22.686 6.554C19.964 6.555 15.702 6.554 13.393 6.554C11.719 6.555 10.638 6.517 9.467 7.133C8.091 7.857 7.052 9.2 6.69 10.777L2.897 4.181V4.181ZM8.007 12C8.007 14.2 9.796 15.99 11.995 15.99C14.194 15.99 15.983 14.2 15.983 12C15.983 9.8 14.194 8.009 11.995 8.009C9.796 8.009 8.007 9.8 8.007 12ZM13.543 17.223C11.305 17.889 8.685 17.15 7.25 14.674C6.155 12.783 3.261 7.741 1.945 5.449C0.615 7.489 0 9.743 0 11.956C0 17.404 3.726 22.606 9.673 23.774L13.543 17.223ZM15.701 8.009C17.565 9.743 17.972 12.551 16.708 14.728C15.757 16.369 12.72 21.494 11.248 23.976C18.437 24.419 24 18.616 24 12.004C24 10.691 23.78 9.344 23.31 8.009H15.701V8.009Z"
          fill={hoverd ? hoverColor : color}
        />
      </g>
      <defs>
        <clipPath id="clip0">
        <rect
          width={width}
          height={height}
          fill="none"
        />
        </clipPath>
      </defs>
    </svg>
  );
};
export default ChromeIcon;
