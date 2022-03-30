import type { TokenState } from "@/types/token";

import React from "react";
import { Colors } from "@/config/colors";
import styled from "styled-components";
import Big from "big.js";


import { Text } from 'components/text';
import { StyleFonts } from "@/config/fonts";
import { ViewIcon } from "../icons/view";
import { getIconURL } from "@/lib/viewblock";

type Prop = {
  token: TokenState;
  value: Big;
  onInput: (value: Big) => void;
  onSelect: () => void
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Container = styled.div`
  background: ${Colors.Black};
  border: 2px solid transparent;

  padding-top: 10px;
  padding-left: 16px;
  padding-right: 16px;
  margin: 10px;

  :hover {
    border: 2px solid ${Colors.Muted};
  }
`;
const DropDown = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  min-width: 100px;
  height: 48px;
`;
const Input = styled.input`
  outline: none;
  border: 0;
  background: ${Colors.Black};
  color: ${Colors.Primary};
  font-size: 50px;

  max-width: 400px;
  width: 100%;
  height: 48px;

  :focus {
    outline: none;
  }
`;

export const FormInput: React.FC<Prop> = ({
  value,
  token,
  onInput,
  onSelect
}) => {
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
      <Container>
        <Wrapper>
          <Input
            value={String(value)}
            onInput={hanldeOnInput}
          />
          <DropDown onClick={onSelect}>
            <img
              src={getIconURL(token.bech32)}
              alt="tokens-logo"
              height="40"
            />
            <Text
              fontColors={Colors.Primary}
              fontVariant={StyleFonts.Bold}
              css="font-size: 20px;padding-left: 5px;padding-right: 5px;"
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
            Balance: 0
          </Text>
        </Wrapper>
      </Container>
    </label>
  );
};
