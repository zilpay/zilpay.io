import React from 'react';

type Prop = {
  width?: number | string;
  height?: number | string;
  color: string;
};

const ArrowIcon: React.FC<Prop> = ({
  width = 24,
  height = 24,
  color
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
};

export default ArrowIcon;
