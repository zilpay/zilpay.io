import type { TokenState } from "@/types/token";

import React from "react";
import Big from "big.js";

import { getIconURL } from "@/lib/viewblock";
import { formatNumber } from "@/filters/n-format";

type Prop = {
  token: TokenState;
  value: Big;
  balance?: bigint;
  disabled?: boolean;
  onInput?: (value: Big) => void;
  onSelect?: () => void;
  onMax?: (b: Big) => void;
};


export const FormInput: React.FC<Prop> = ({
  value,
  token,
  balance = BigInt(0),
  disabled = false,
  onInput = () => null,
  onSelect = () => null,
  onMax = () => null
}) => {
  const amount = React.useMemo(() => {
    if (!balance) {
      return Big(0);
    }

    const qa = Big(String(balance));
    const decimal = Big(10**token.decimals);

    return qa.div(decimal);
  }, [token, balance]);

  const hanldeOnInput = React.useCallback((event) => {
    if (event.target.value.endsWith(',')) {
      return;
    }
    if (event.target.value) {
      onInput(Big(event.target.value));
    } else {
      onInput(Big(0));
    }
  }, []);

  return (
    <label>
      <div className={'dex-input-container ' + disabled ? 'disabled' : ''}>
        <div className="wrapper">
          <input
            value={String(value)}
            disabled={disabled}
            onInput={hanldeOnInput}
          />
          <div
            className={'drop-down ' + disabled ? 'disabled' : ''}
            onClick={onSelect}
          >
            <img
              src={getIconURL(token.bech32)}
              alt="tokens-logo"
              height="30"
              width="30"
            />
            <p>
              {token.symbol}
            </p>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path
                d="M12.7121 7.40887C12.9717 7.14775 12.9705 6.72565 12.7094 6.46606C12.4483 6.20648 12.0261 6.20772 11.7666 6.46884L12.7121 7.40887ZM4.17192 6.73178C3.91157 6.47143 3.48946 6.47143 3.22911 6.73178C2.96876 6.99213 2.96876 7.41424 3.22911 7.67459L4.17192 6.73178ZM7.85072 11.3534L7.37932 11.8248C7.50458 11.9501 7.67455 12.0203 7.8517 12.0201C8.02886 12.0198 8.19862 11.949 8.32351 11.8234L7.85072 11.3534ZM3.22911 7.67459L7.37932 11.8248L8.32213 10.882L4.17192 6.73178L3.22911 7.67459ZM8.32351 11.8234L12.7121 7.40887L11.7666 6.46884L7.37793 10.8834L8.32351 11.8234Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div className="wrapper">
          <p>
            $73.569
          </p>
          <p
            className="balance"
            onClick={() => onMax(amount)}
          >
            {formatNumber(Number(amount))}
          </p>
        </div>
      </div>
    </label>
  );
};
