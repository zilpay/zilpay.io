import styles from "./index.module.scss";

import type { TokenState } from "@/types/token";

import Big from "big.js";
import { useStore } from "react-stores";
import React from "react";

import { DragonDex } from "@/mixins/dex";
import { ZERO_ADDR } from "@/config/conts";
import { $tokens } from "@/store/tokens";

type Prop = {
  tokens: TokenState[];
};

const dex = new DragonDex();
export var PriceInfo: React.FC<Prop> = function ({ tokens }) {
  const tokensStore = useStore($tokens);

  const price = React.useMemo(() => {
    const [x, y] = tokens;
    const one = Big(1);
    let price = Big(0);

    try {
      if (x.base16 === ZERO_ADDR && y.base16 !== ZERO_ADDR) {
        const foundIndex = tokensStore.tokens.findIndex((t) => t.meta.base16 === y.base16);
        price = dex.zilToTokens(one, foundIndex);
      } else if (y.base16 === ZERO_ADDR && x.base16 !== ZERO_ADDR) {
        const foundIndex = tokensStore.tokens.findIndex((t) => t.meta.base16 === x.base16);
        price = dex.tokensToZil(one, foundIndex);
      } else {
        const foundIndexX = tokensStore.tokens.findIndex((t) => t.meta.base16 === y.base16);
        const foundIndexY = tokensStore.tokens.findIndex((t) => t.meta.base16 === x.base16);
        price = dex.tokensToTokens(one, foundIndexX, foundIndexY);
      }
    } catch {
      ///
    }

    return price;
  }, [tokens, tokensStore]);

  return (
    <div className={styles.container}>
      <p>
        1 {tokens[0].symbol} = {String(price)} {tokens[1].symbol} ($1.55824)
      </p>
    </div>
  );
};
