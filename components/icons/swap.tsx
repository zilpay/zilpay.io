import React from 'react';


type Prop = {
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
};

const SwapIcon: React.FC<Prop> = ({
  width = 32,
  height = 33,
  onClick
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 33"
      fill="none"
      onClick={onClick}
    >
      <rect
        width="32"
        height="32"
        transform="translate(0 0.5)"
        fill="var(--button-color)"
      />
      <path
        d="M23.1595 13.2071L22.0151 12.0628L22.0151 21.1685L20.0151 21.1685L20.0151 11.8904L18.6984 13.2071L17.2842 11.7929L20.9289 8.14813L24.5737 11.7929L23.1595 13.2071Z"
        fill="var(--text-color)"
      />
      <path
        d="M9.95549 21.071L8.63875 19.7543L7.22454 21.1685L10.8693 24.8133L14.514 21.1685L13.0998 19.7543L11.9555 20.8986L11.9555 11.7929L9.9555 11.7929L9.95549 21.071Z"
        fill="var(--text-color)"
      />
    </svg>
  );
};

export default SwapIcon;
