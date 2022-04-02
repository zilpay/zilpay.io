import styles from './index.module.scss';

import type { TokenState } from "@/types/token";

import React from "react";
import { Big } from "big.js";
import Image from 'next/image';

import { getIconURL } from "lib/viewblock";
import { formatNumber } from "@/filters/n-format";

type Prop = {
  token: TokenState;
  balance?: bigint;
  onClick: (token: TokenState) => void;
};

Big.PE = 999;


export const TokenCard: React.FC<Prop> = function ({
  token,
  onClick,
  balance = BigInt(0)
}) {
  const amount = React.useMemo(() => {
    const qa = Big(String(balance));
    const decimal = Big(10**token.decimals);
    const value = qa.div(decimal);

    return formatNumber(Number(value));
  }, [token, balance]);

  return (
    <div
      className={styles.container}
      onClick={() => onClick(token)}
    >
      <Image
        src={getIconURL(token.bech32)}
        alt={token.symbol}
        height="30"
        width="30"
      />
      <div className={styles.wrapper}>
        <p className={styles.left}>
          {token.symbol}
        </p>
        <p className={styles.right}>
          {token.name}
        </p>
      </div>
      <p>
        {String(amount)}
      </p>
    </div>
  );
};
