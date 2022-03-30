import React from "react";
import { Colors } from "config/colors";

type Prop = {
  color?: string | Colors;
  width?: number | string;
  height?: number | string;
};

export var CloseIcon: React.FC<Prop> = function ({
  color = Colors.Primary,
  width = 20,
  height = 20
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 26 26" fill="none">
      <path
        d="M1.68555 1.68652L24.313 24.3139"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M1.6875 24.3135L24.3149 1.68606"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
};
