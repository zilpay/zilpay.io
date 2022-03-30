import type { TokenState } from "@/types/token";

import React from "react";
import styled from "styled-components";
import Big from "big.js";

import { Text } from 'components/text';
import { StyleFonts } from "@/config/fonts";
import { getIconURL } from "@/lib/viewblock";

import { Colors } from "@/config/colors";
import { formatNumber } from "@/filters/n-format";

type Prop = {
  token: TokenState;
  value: Big;
  balance?: bigint;
  disabled?: boolean;
  onInput?: (value: Big) => void;
  onSelect?: () => void
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Container = styled.div`
  background: ${Colors.Button};
  border: 1px solid transparent;
  border-radius: 16px;

  padding-top: 10px;
  padding-left: 16px;
  padding-right: 16px;

  .disabled:hover {
    border: 1px solid transparent;
    pointer-events: none;
  }

  :hover :not(.disabled) {
    border: 1px solid ${Colors.Primary};
  }
`;
const DropDown = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  min-width: 100px;
  height: 38px;
  padding-left: 10px;
  padding-right: 10px;

  border-radius: 8px;

  .disabled {
    cursor: default;
    pointer-events: none;
  }

  :hover :not(.disabled) {
    background-color: ${Colors.Hover};
  }
`;
const Input = styled.input`
  font-size: 30px;

  max-width: 400px;
  width: 100%;
  height: 38px;

  :focus {
    outline: none;
  }

  :disabled {
    pointer-events: none;
  }
`;

export const FormInput: React.FC<Prop> = ({
  value,
  token,
  balance,
  disabled = false,
  onInput = () => null,
  onSelect = () => null
}) => {
  const amount = React.useMemo(() => {
    if (!balance) {
      return '';
    }

    const qa = Big(String(balance));
    const decimal = Big(10**token.decimals);
    const value = qa.div(decimal);

    return formatNumber(Number(value));
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
      <Container className={disabled ? 'disabled' : ''}>
        <Wrapper>
          <Input
            value={String(value)}
            disabled={disabled}
            onInput={hanldeOnInput}
          />
          <DropDown
            className={disabled ? 'disabled' : ''}
            onClick={onSelect}
          >
            <img
              src={getIconURL(token.bech32)}
              alt="tokens-logo"
              height="30"
              width="30"
            />
            <Text
              fontColors={Colors.Primary}
              fontVariant={StyleFonts.Bold}
              css="font-size: 18px;padding-left: 3px;padding-right: 3px;"
            >
              {token.symbol}
            </Text>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path
                d="M12.7121 7.40887C12.9717 7.14775 12.9705 6.72565 12.7094 6.46606C12.4483 6.20648 12.0261 6.20772 11.7666 6.46884L12.7121 7.40887ZM4.17192 6.73178C3.91157 6.47143 3.48946 6.47143 3.22911 6.73178C2.96876 6.99213 2.96876 7.41424 3.22911 7.67459L4.17192 6.73178ZM7.85072 11.3534L7.37932 11.8248C7.50458 11.9501 7.67455 12.0203 7.8517 12.0201C8.02886 12.0198 8.19862 11.949 8.32351 11.8234L7.85072 11.3534ZM3.22911 7.67459L7.37932 11.8248L8.32213 10.882L4.17192 6.73178L3.22911 7.67459ZM8.32351 11.8234L12.7121 7.40887L11.7666 6.46884L7.37793 10.8834L8.32351 11.8234Z"
                fill="white"
              />
            </svg>
          </DropDown>
        </Wrapper>
        <Wrapper>
          <Text>
            $73.569
          </Text>
          <Text>
            {amount}
          </Text>
        </Wrapper>
      </Container>
    </label>
  );
};
