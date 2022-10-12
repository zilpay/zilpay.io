
import styles from "./index.module.scss";

import Image from "next/image";
import React from 'react';


type Prop = {
  url: string;
  title: string;
  selected?: boolean;
  children?: React.ReactNode;
};

export const InfoCard: React.FC<Prop> = ({ url, title, selected, children }) => (
  <div
    className={styles.card}
    style={{
      borderColor: selected ? 'var(--secondary-color)' : undefined
    }}
  >
    <Image
      src={url}
      alt="Icon"
      height={50}
      width={50}
    />
    <h3>
      {title}
    </h3>
    <b>
      {children}
    </b>
  </div>
);
