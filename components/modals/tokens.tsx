import type { TokenState } from "@/types/token";

import React from "react";
import { useStore } from "effector-react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

import { Modal } from "components/modal";
import { Text } from "components/text";
import { CloseIcon } from "components/icons/close";
import { Colors } from "config/colors";
import { TokenCard } from "components/token-card";

import { $pools } from "@/store/pools";
import { $wallet } from "@/store/wallet";

type Prop = {
  show: boolean;
  onClose: () => void;
  onSelect: (token: TokenState) => void;
};

const Between = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    cursor: pointer;
    padding: 16px;

    :hover {
      svg > path {
        stroke: ${Colors.Muted};
      }
    }
  }
`;

export var TokensModal: React.FC<Prop> = function ({
  show,
  onClose,
  onSelect
}) {
  const common = useTranslation(`common`);

  const pools = useStore($pools);
  const wallet = useStore($wallet);

  return (
    <Modal
      show={show}
      title={(
        <Between>
          <Text css="padding: 0 16px;">{common.t(`account`)}</Text>
          <span onClick={onClose}>
            <CloseIcon />
          </span>
        </Between>
      )}
      width="450px"
      onClose={onClose}
    >
      {pools.slice(1).map((pool) => (
        <TokenCard
          token={pool.meta}
          balance={pool.balance[wallet?.base16 || '']}
          key={pool.meta.bech32}
          onClick={onSelect}
        />
      ))}
    </Modal>
  );
};
