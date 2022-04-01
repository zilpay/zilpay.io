import React from 'react';

type Prop = {
  width: number | string;
  height: number | string;
  color: string;
  hoverColor?: string;
};

const GoogleIcon: React.FC<Prop> = ({
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
      <path d="M3 22V2L21 12L3 22Z" fill={hoverd ? hoverColor : color}/>
    </svg>
  );
};

export default GoogleIcon;
