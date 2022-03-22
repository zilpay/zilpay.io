import React from "react";
import { Colors } from "config/colors";

type Prop = {
  color?: string | Colors;
  width?: number | string;
  height?: number | string;
};

export var SuccessIcon: React.FC<Prop> = function ({
  color = Colors.Success,
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
};
