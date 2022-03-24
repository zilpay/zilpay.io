import React from "react";
import { useStore } from "effector-react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

import { Modal } from "components/modal";
import { Text } from "components/text";
import { CloseIcon } from "components/icons/close";
import { TxCard } from "components/tx-card";
import { Colors } from "config/colors";
import { $transactions, resetTxList } from "store/transactions";
import { AccountCard } from "@/components/account-card";

import { StyleFonts } from "@/config/fonts";
import { Wallet } from "@/store/wallet";

type Prop = {
  show: boolean;
  onClose: () => void;
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
  onClose
}) {
  const common = useTranslation(`common`);

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
      dasdasdas
    </Modal>
  );
};
