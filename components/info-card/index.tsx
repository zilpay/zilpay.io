
import styles from "./index.module.scss";

import React from 'react';


type Prop = {
  url: string;
  title: string;
  selected?: boolean;
};

export const InfoCard: React.FC<Prop> = ({ url, selected, title, children }) => (
  <div className={styles.card}>
    <img
      src={url}
      height="60"
      width="60"
      alt="Icon"
    />
    <h3>
      {title}
    </h3>
    <b>
      {children}
    </b>
  </div>
);
