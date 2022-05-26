import styles from './index.module.scss';

import type { TokenState } from "@/types/token";

import React from "react";
import Big from "big.js";
import Image from 'next/image';

import { getIconURL } from "@/lib/viewblock";
import classNames from 'classnames';
import { DEFAULT_CURRENCY, ZERO_ADDR } from '@/config/conts';
import { DragonDex } from '@/mixins/dex';
import { formatNumber } from '@/filters/n-format';
import { useStore } from 'react-stores';
import { $settings } from '@/store/settings';
import { $tokens } from '@/store/tokens';
import ArrowIcon from '@/components/icons/arrow';
import { DEFAUL_GAS } from '@/mixins/zilpay-base';


Big.PE = 999;


type Prop = {
  token: TokenState;
  value: Big;
  balance?: string;
  disabled?: boolean;
  gasLimit?: Big;
  onInput?: (value: Big) => void;
  onSelect?: () => void;
  onMax?: (b: Big) => void;
};

const list = [0, 10, 25, 50, 75, 100];
const dex = new DragonDex();
export const FormInput: React.FC<Prop> = ({
  value,
  token,
  balance = BigInt(0),
  disabled = false,
  gasLimit = Big(0),
  onInput = () => null,
  onSelect = () => null,
  onMax = () => null
}) => {
  const settings = useStore($settings);
  const tokensStore = useStore($tokens);

  const converted = React.useMemo(() => {
    const rate = Big(settings.rate);

    if (token.base16 === ZERO_ADDR) {
      return formatNumber(String(value.mul(rate)), DEFAULT_CURRENCY);
    }

    const zils = dex.tokensToZil(value, token);
    return formatNumber(String(zils.mul(rate)), DEFAULT_CURRENCY);
  }, [settings, value, tokensStore, token]);

  const hanldePercent = React.useCallback((n: number) => {
    const percent = BigInt(n);
    let value = (BigInt(balance) * percent / BigInt(100));

    if (token.base16 === ZERO_ADDR) {
      const gasPrice = Big(DEFAUL_GAS.gasPrice);
      const li = gasLimit.mul(gasPrice);
      const fee = BigInt(li.mul(dex.toDecimails(6)).round().toString());

      if (fee > value) {
        value = BigInt(0);
      } else {
        value -= fee;
      }
    }

    const decimals = dex.toDecimails(token.decimals);

    onMax(Big(String(value)).div(decimals));
  }, [balance, token, onMax, gasLimit]);

  const hanldeOnInput = React.useCallback((event) => {
    try {
      if (event.target.value) {
        onInput(Big(event.target.value));
      } else {
        onInput(Big(0));
      }
    } catch {
      ////
    }
  }, [onInput]);

  return (
    <label>
      <div
        className={classNames(styles.container)}
      >
        <div className={styles.wrapper}>
          <input
            value={String(value)}
            disabled={disabled}
            onInput={hanldeOnInput}
          />
          <div
            className={classNames(styles.dropdown)}
            onClick={onSelect}
          >
            <Image
              src={getIconURL(token.bech32)}
              alt="tokens-logo"
              height="30"
              width="30"
            />
            <p>
              {token.symbol}
            </p>
            <ArrowIcon color="var(--primary-color)"/>
          </div>
        </div>
        <div className={styles.wrapper}>
          <p>
            {converted}
          </p>
          {disabled ? null : (
            <div className={styles.row}>
              {list.map((n) => (
                <p
                  key={n}
                  className={styles.balance}
                  onClick={() => hanldePercent(n)}
                >
                  {n}%
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </label>
  );
};
