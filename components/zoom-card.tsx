import "@/styles/components/zoom-card";

import React from 'react';

type Prop = {
  url: string;
  href: string;
  title: string;
  onClick?: (url: string) => void;
};

export const ZoomCard: React.FC<Prop> = ({
  url,
  title,
  href,
  children,
  onClick = () => null
}) => (
  <div
    className="zoom-card"
    style={{
      backgroundImage: `url(${url})`
    }}
    onClick={() => onClick(href)}
  >
    <h3>
      {title}
    </h3>
    <p>
      {children}
    </p>
  </div>
);
