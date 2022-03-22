import React from "react";
import { Colors } from "config/colors";

type Prop = {
  color?: string | Colors;
  width?: number | string;
  height?: number | string;
};

export var RejectIcon: React.FC<Prop> = function ({
  color = Colors.Danger,
  width = 16,
  height = 16,
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <path
        d="M10 0C4.489 0 0 4.489 0 10C0 15.511 4.489 20 10 20C15.511 20 20 15.511 20 10C20 4.489 15.511 0 10 0ZM10 2C14.4301 2 18 5.56988 18 10C18 11.8531 17.3693 13.5506 16.3184 14.9043L5.0957 3.68164C6.44944 2.63074 8.14693 2 10 2ZM3.68164 5.0957L14.9043 16.3184C13.5506 17.3693 11.8531 18 10 18C5.56988 18 2 14.4301 2 10C2 8.14693 2.63074 6.44944 3.68164 5.0957Z"
        fill={color}
      />
    </svg>
  );
};
