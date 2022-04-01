import "@/styles/components/_token-card.scss";

import type { TokenState } from "@/types/token";

import React from "react";
import { Big } from "big.js";
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
      className="token-card"
      onClick={() => onClick(token)}
    >
      <LazyLoadImage
        src={getIconURL(token.bech32)}
        alt={token.symbol}
        height="30"
      />
      <div className="wrapper">
        <p className="f">
          {token.symbol}
        </p>
        <p className="s">
          {token.name}
        </p>
      </div>
      <p>
        {String(amount)}
      </p>
    </div>
  );
};
