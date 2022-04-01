import React from 'react';

type Prop = {
  width: number | string;
  height: number | string;
  color: string;
  hoverColor?: string;
};

const FireFoxIcon: React.FC<Prop> = ({
  width,
  height,
  color,
  hoverColor = 'var(--primary-color)'
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
        d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM20.003 8.657C18.727 5.336 15.543 4.052 14.469 4.12C17.998 5.496 18.842 10.179 18.529 11.561C18.222 9.94 17.243 8.544 16.657 8.176C20.074 16.181 11.822 18.641 9.304 15.863C9.953 16.031 11.235 15.948 12.195 15.306C13.093 14.704 13.178 14.668 13.755 14.623C14.441 14.57 13.714 13.217 12.216 13.446C11.6 13.54 10.584 14.265 9.336 13.787C7.828 13.211 7.876 11.153 9.432 11.772C9.769 11.335 9.52 10.509 9.52 10.509C9.972 10.095 10.542 9.803 10.89 9.598C11.118 9.463 11.719 9.091 11.685 8.368C11.562 8.272 11.365 8.149 10.919 8.175C9.183 8.285 9.067 7.657 8.952 7.367C9.03 6.699 9.476 5.833 10.313 5.436C9.056 5.243 8.033 5.833 7.524 6.59C6.715 6.416 6.219 6.407 5.406 6.559C5.09 6.319 4.74 5.889 4.528 5.378C6.36 3.312 9.027 2 12 2C17.912 2 20.263 6.283 20.003 8.657Z"
        fill={hoverd ? hoverColor : color}
      />
    </svg>
  );
};

export default FireFoxIcon;
