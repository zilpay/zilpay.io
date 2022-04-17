import styles from './index.module.scss';

import type { TokenState } from '@/types/token';

import Image from 'next/image';
import React from "react";
import { getIconURL } from '@/lib/viewblock';

type Prop = {
  tokens: TokenState[];
};

export const ImagePair: React.FC<Prop> = ({ tokens }) => {
  return (
    <div className={styles.imgwrap}>
      {tokens.map((el) => (
        <Image
          src={getIconURL(el.bech32)}
          alt={el.symbol}
          key={el.symbol}
          height="30"
          width="30"
          className={styles.symbol}
        />
      ))}
    </div>
  );
};