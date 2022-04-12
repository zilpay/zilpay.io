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
      <div className={styles.icon}>
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M4.93193 14.1366C4.54256 14.5283 4.54442 15.1615 4.93609 15.5508C5.32777 15.9402 5.96093 15.9384 6.3503 15.5467L4.93193 14.1366ZM17.7423 15.1523C18.1328 15.5428 18.766 15.5428 19.1565 15.1523C19.547 14.7617 19.547 14.1286 19.1565 13.7381L17.7423 15.1523ZM12.2241 8.21985L12.9312 7.51275C12.7433 7.32485 12.4883 7.21946 12.2226 7.21985C11.9569 7.22025 11.7022 7.32638 11.5149 7.51483L12.2241 8.21985ZM19.1565 13.7381L12.9312 7.51275L11.517 8.92696L17.7423 15.1523L19.1565 13.7381ZM11.5149 7.51483L4.93193 14.1366L6.3503 15.5467L12.9332 8.92488L11.5149 7.51483Z"
            fill="var(--muted-color)"
          />
        </svg>
      </div>
    </div>
  );
};
