import styles from "./index.module.scss";

import type { TokenState } from "@/types/token";

import Big from "big.js";
import { useStore } from "react-stores";
import React from "react";

import { DragonDex } from "@/mixins/dex";
import { DEFAULT_CURRENCY, ZERO_ADDR } from "@/config/conts";
import { $tokens } from "@/store/tokens";
import { $settings } from "@/store/settings";
import { formatNumber } from "@/filters/n-format";
import { $liquidity } from "@/store/shares";


Big.PE = 999;


type Prop = {
  tokens: TokenState[];
  onClick?: () => void;
};

const dex = new DragonDex();
export var PriceInfo: React.FC<Prop> = function ({
  tokens,
  onClick = () => null
}) {
  const tokensStore = useStore($tokens);
  const settingsStore = useStore($settings);
  const liquidity = useStore($liquidity);

  const price = React.useMemo(() => {
    const [x, y] = tokens;
    const one = Big(1);
    let price = Big(0);

    try {
      if (x.base16 === ZERO_ADDR && y.base16 !== ZERO_ADDR) {
        const [bigZil, bigTokens] = liquidity.pools[y.base16];
        const zilReserve = Big(String(bigZil)).div(dex.toDecimails(x.decimals));
        const tokensReserve = Big(String(bigTokens)).div(dex.toDecimails(y.decimals));

        price = tokensReserve.div(zilReserve);
      } else if (y.base16 === ZERO_ADDR && x.base16 !== ZERO_ADDR) {
        const [bigZil, bigTokens] = liquidity.pools[x.base16];
        const zilReserve = Big(String(bigZil)).div(dex.toDecimails(y.decimals));
        const tokensReserve = Big(String(bigTokens)).div(dex.toDecimails(x.decimals));

        price = zilReserve.div(tokensReserve);
      } else {
        const foundIndexX = tokensStore.tokens.findIndex((t) => t.meta.base16 === y.base16);
        const foundIndexY = tokensStore.tokens.findIndex((t) => t.meta.base16 === x.base16);
        price = dex.tokensToTokens(one, foundIndexX, foundIndexY);
      }
    } catch {
      ///
    }

    return price;
  }, [tokens, tokensStore, liquidity]);

  const converted = React.useMemo(() => {
    const [x] = tokens;
    const { rate } = settingsStore;

    if (x.base16 === ZERO_ADDR) {
      return formatNumber(rate, DEFAULT_CURRENCY);
    }

    return formatNumber(Number(price) * rate, DEFAULT_CURRENCY);
  }, [tokens, settingsStore, price]);

  return (
    <div className={styles.container}>
      <p onClick={onClick}>
        1 {tokens[0].symbol} = {String(price)} {tokens[1].symbol} <span>
          ({converted})
        </span>
      </p>
    </div>
  );
};
