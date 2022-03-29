import type { TokenState } from "@/types/token";

import React from "react";
import { Big } from "big.js";
import styled from "styled-components";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Modal } from "components/modal";
import { Text } from "components/text";
import { CloseIcon } from "components/icons/close";
import { TxCard } from "components/tx-card";
import { Colors } from "config/colors";
import { $transactions, resetTxList } from "store/transactions";

import { StyleFonts } from "@/config/fonts";
import { Wallet } from "@/store/wallet";
import { $pools } from "@/store/pools";
import { getIconURL } from "lib/viewblock";
import { formatNumber } from "@/filters/n-format";

type Prop = {
  token: TokenState;
  balance?: bigint;
  onClick: (token: TokenState) => void;
};

Big.PE = 999;

const Container = styled.div`
  cursor: pointer;

  padding-left: 10px;
  padding-right: 10px;

  padding-block-start: 5px;
  padding-block-end: 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  :hover {
    background-color: rgb(44, 47, 54);
  }
}
`;
const Wrapper = styled.div`
  text-indent: 10px;
`;

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
    <Container onClick={() => onClick(token)}>
      <LazyLoadImage
        src={getIconURL(token.bech32)}
        alt={token.symbol}
        height="30"
      />
      <Wrapper>
        <Text
          fontColors={Colors.White}
          css="margin: 0;font-weight: 500;"
        >
          {token.symbol}
        </Text>
        <Text css="margin: 0;font-weight: 300;font-size: 12px;">
          {token.name}
        </Text>
      </Wrapper>
      <Text css="width: 100%;text-align: right;">
        {String(amount)}
      </Text>
    </Container>
  );
};
