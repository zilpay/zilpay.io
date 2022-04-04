import React from "react";


type Prop = {
  color?: string;
  width?: number | string;
  height?: number | string;
};

export var ViewIcon: React.FC<Prop> = function ({
  color = 'var(--muted-color)',
  width = 16,
  height = 16,
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
};
