import React from "react";

type Prop = {
  color?: string;
  width?: number | string;
  height?: number | string;
};

export var BackIcon: React.FC<Prop> = function ({
  color = 'var(--text-color)',
  width = 24,
  height = 24
}) {
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
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  );
};
