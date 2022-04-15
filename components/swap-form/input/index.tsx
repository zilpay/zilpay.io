import styles from './index.module.scss';

import type { TokenState } from "@/types/token";

import React from "react";
import Big from "big.js";
import Image from 'next/image';

import { getIconURL } from "@/lib/viewblock";
import classNames from 'classnames';
import { SHARE_PERCENT_DECIMALS } from '@/config/conts';
import { DragonDex } from '@/mixins/dex';


Big.PE = 999;


type Prop = {
  token: TokenState;
  value: Big;
  balance?: string;
  disabled?: boolean;
  onInput?: (value: Big) => void;
  onSelect?: () => void;
  onMax?: (b: Big) => void;
};

const list = [10, 25, 50, 75, 100];
const dex = new DragonDex();
export const FormInput: React.FC<Prop> = ({
  value,
  token,
  balance = BigInt(0),
  disabled = false,
  onInput = () => null,
  onSelect = () => null,
  onMax = () => null
}) => {
  const hanldePercent = React.useCallback((n: number) => {
    const percent = BigInt(n);
    const value = BigInt(balance) * percent / BigInt(SHARE_PERCENT_DECIMALS);
    const decimals = dex.toDecimails(token.decimals);

    onMax(Big(String(value)).div(decimals));
  }, [balance, token, onMax]);

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
        className={classNames(styles.container, {
          disabled
        })}
      >
        <div className={styles.wrapper}>
          <input
            value={String(value)}
            disabled={disabled}
            onInput={hanldeOnInput}
          />
          <div
            className={classNames(styles.dropdown, {
              disabled
            })}
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
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M12.7121 7.40887C12.9717 7.14775 12.9705 6.72565 12.7094 6.46606C12.4483 6.20648 12.0261 6.20772 11.7666 6.46884L12.7121 7.40887ZM4.17192 6.73178C3.91157 6.47143 3.48946 6.47143 3.22911 6.73178C2.96876 6.99213 2.96876 7.41424 3.22911 7.67459L4.17192 6.73178ZM7.85072 11.3534L7.37932 11.8248C7.50458 11.9501 7.67455 12.0203 7.8517 12.0201C8.02886 12.0198 8.19862 11.949 8.32351 11.8234L7.85072 11.3534ZM3.22911 7.67459L7.37932 11.8248L8.32213 10.882L4.17192 6.73178L3.22911 7.67459ZM8.32351 11.8234L12.7121 7.40887L11.7666 6.46884L7.37793 10.8834L8.32351 11.8234Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div className={styles.wrapper}>
          <p>
            $73.569
          </p>
          <div className={styles.row}>
            {list.map((n) => (
              <p
                className={styles.balance}
                onClick={() => hanldePercent(n)}
              >
                {n}%
              </p>
            ))}
          </div>
        </div>
      </div>
    </label>
  );
};
