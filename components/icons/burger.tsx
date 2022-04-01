import "@/styles/components/_burger.scss";

import React from 'react';


type Prop = {
  width: number | string;
  height: number | string;
  color?: string;
  onClick: () => void;
};

const BurgerIcon: React.FC<Prop> = ({
  width,
  height,
  color = 'var(--primary-color)',
  onClick
}) => (
    <div
      onClick={onClick}
      className="burger"
      style={{
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      <div
        className="line"
        style={{
          background: color
        }}
      />
      <div
        className="line"
        style={{
          background: color
        }}
      />
      <div
        className="line"
        style={{
          background: color
        }}
      />
    </div>
  );

export default BurgerIcon;
