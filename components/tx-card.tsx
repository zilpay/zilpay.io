import { Puff } from "react-loader-spinner";
import React from "react";
import styled from "styled-components";
import { Colors } from "config/colors";
import { Tx } from "store/transactions";
import { viewTransaction } from "lib/viewblock";

import { SuccessIcon } from "components/icons/success";
import { RejectIcon } from "components/icons/reject";

type Prop = {
  tx: Tx;
};

type StatusIconProp = {
  rejected?: boolean;
  loading: boolean;
};

const Transaction = styled.a`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 5px;
`;
const Wrapper = styled.div`
  cursor: pointer;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.825rem;
  color: ${Colors.Primary};
  text-decoration-thickness: 0.125em;
  text-underline-offset: 1.5px;
  text-decoration: none;

  :hover {
    text-decoration: underline;
    color: ${Colors.Primary};
  }
`;
const TextWrapper = styled.div`
  font-size: 0.825rem;
`;

const StatusIcon: React.FC<StatusIconProp> = function ({ rejected, loading }) {
  if (rejected && !loading) {
    return <RejectIcon />;
  }

  if (!rejected && !loading) {
    return <SuccessIcon />;
  }

  return <Puff color={Colors.Primary} height={16} width={16} />;
};

export var TxCard: React.FC<Prop> = function ({ tx }) {
  return (
    <Transaction href={viewTransaction(tx.hash)} target="_blank">
      <Wrapper>
        <TextWrapper>
          {tx.name}
          {` `}
          ↗
        </TextWrapper>
      </Wrapper>
      <StatusIcon rejected={tx.error} loading={!tx.confirmed} />
    </Transaction>
  );
};
