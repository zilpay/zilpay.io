import "@/styles/components/card";

import React from 'react';


type Prop = {
  url: string;
  title: string;
  selected?: boolean;
};

export const Card: React.FC<Prop> = ({ url, selected, title, children }) => (
  <div className={'card' + selected ? 'selected' : ''}>
    <img
      src={url}
      height="60"
      width="60"
      alt="Icon"
    />
    <p>
      {title}
    </p>
    <b>
      {children}
    </b>
  </div>
);
