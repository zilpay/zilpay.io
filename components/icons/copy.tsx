import React from "react";

type Prop = {
  color?: string;
  width?: number | string;
  height?: number | string;
};

export var CopyIcon: React.FC<Prop> = function ({
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
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
};
