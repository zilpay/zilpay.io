import styles from "./index.module.scss";

import type { SwapPair } from "@/types/swap";

import _Big from "big.js";
import { useStore } from "react-stores";
import React from "react";
import toformat from 'toformat';

import { DragonDex } from "@/mixins/dex";
import { DEFAULT_CURRENCY, ZERO_ADDR } from "@/config/conts";
import { $tokens } from "@/store/tokens";
import { $settings } from "@/store/settings";
import { formatNumber } from "@/filters/n-format";
import { $liquidity } from "@/store/shares";
import ArrowIcon from "../icons/arrow";

const Big = toformat(_Big);

Big.PE = 999;


type Prop = {
  tokens: SwapPair[];
  onClick?: () => void;
  onShow?: () => void;
};

const dex = new DragonDex();
export var PriceInfo: React.FC<Prop> = function ({
  tokens,
  onShow,
  onClick = () => null
}) {
  const tokensStore = useStore($tokens);
  const settingsStore = useStore($settings);
  const liquidity = useStore($liquidity);

  const price = React.useMemo(() => {
    const [x, y] = tokens;
    const one = Big(1);
    let price = Big(0);

    if (Number(x.value) > 0 && Number(y.value) > 0) {
      return Big(y.value).div(x.value);
    }

    try {
      if (x.meta.base16 === ZERO_ADDR && y.meta.base16 !== ZERO_ADDR) {
        const [bigZil, bigTokens] = liquidity.pools[y.meta.base16];
        const zilReserve = Big(String(bigZil)).div(dex.toDecimails(x.meta.decimals));
        const tokensReserve = Big(String(bigTokens)).div(dex.toDecimails(y.meta.decimals));

        price = tokensReserve.div(zilReserve);
      } else if (y.meta.base16 === ZERO_ADDR && x.meta.base16 !== ZERO_ADDR) {
        const [bigZil, bigTokens] = liquidity.pools[x.meta.base16];
        const zilReserve = Big(String(bigZil)).div(dex.toDecimails(y.meta.decimals));
        const tokensReserve = Big(String(bigTokens)).div(dex.toDecimails(x.meta.decimals));

        price = zilReserve.div(tokensReserve);
      } else {
        const [zilliqa] = tokensStore.tokens;
        const [inputZils, inputTokens] = liquidity.pools[x.meta.base16];
        const [outpuZils, outputTokens] = liquidity.pools[y.meta.base16];

        const bigInputZils = Big(String(inputZils)).div(dex.toDecimails(zilliqa.meta.decimals));
        const bigInputTokens = Big(String(inputTokens)).div(dex.toDecimails(x.meta.decimals));

        const bigOutpuZils = Big(String(outpuZils)).div(dex.toDecimails(zilliqa.meta.decimals));
        const bigOutputTokens = Big(String(outputTokens)).div(dex.toDecimails(y.meta.decimals));

        const inputRate = bigInputTokens.div(bigInputZils);
        const outpuRate = bigOutputTokens.div(bigOutpuZils);
        const value = one.mul(outpuRate).div(inputRate);

        price = value.div(one);
      }
    } catch {
      ///
    }

    return price;
  }, [tokens, tokensStore, liquidity]);

  const converted = React.useMemo(() => {
    const [x] = tokens;
    const { rate } = settingsStore;

    if (x.meta.base16 === ZERO_ADDR) {
      return formatNumber(rate, DEFAULT_CURRENCY);
    }

    return formatNumber(Number(price) * rate, DEFAULT_CURRENCY);
  }, [tokens, settingsStore, price]);

  return (
    <div className={styles.container}>
      <p onClick={onClick}>
        1 {tokens[0].meta.symbol} = {price.round(12).toFormat()} {tokens[1].meta.symbol} <span>
          ({converted})
        </span>
      </p>
      {onShow ? (
        <span onClick={onShow}>
          <ArrowIcon color="var(--secondary-color)" />
        </span>
      ) : null}
    </div>
  );
};
