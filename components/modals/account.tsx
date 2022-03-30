import React from "react";
import { useStore } from "effector-react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

import { Modal, ModalHeader } from "components/modal";
import { Text } from "components/text";
import { TxCard } from "components/tx-card";
import { Colors } from "config/colors";
import { $transactions, resetTxList } from "store/transactions";
import { AccountCard } from "@/components/account-card";

import { StyleFonts } from "@/config/fonts";
import { Wallet } from "@/store/wallet";

type Prop = {
  show: boolean;
  address: Wallet | null;
  onClose: () => void;
};

const TxContainer = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 80px;
  height: fit-content;
  padding: 16px;
  background: ${Colors.Card};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export var AccountModal: React.FC<Prop> = function ({
  show,
  onClose,
  address
}) {
  const common = useTranslation(`common`);
  const txList = useStore($transactions);

  return (
    <Modal
      show={show}
      title={(
        <ModalHeader onClose={onClose}>
          {common.t(`account`)}
        </ModalHeader>
      )}
      width="450px"
      onClose={onClose}
    >
      <AccountCard wallet={address} />
      <TxContainer>
        {txList.length === 0 ? (
          <Text
            fontVariant={StyleFonts.Regular}
            size="16px"
            css="text-align: center;margin-top: 10px;"
          >
            {common.t(`tx_appear_here`)}
          </Text>
        ) : (
          <div>
            <div className="header">
              <Text fontVariant={StyleFonts.Regular} size="16px" css="">
                {common.t(`recent_txns`)}
              </Text>
              <Text
                fontVariant={StyleFonts.Regular}
                fontColors={Colors.Border}
                size="16px"
                css="cursor: pointer;user-select: none;"
                onClick={() => resetTxList(String(address?.base16))}
              >
                (
                {common.t(`clear_all`)}
                )
              </Text>
            </div>
            {txList.map((tx) => (
              <TxCard key={tx.hash} tx={tx} />
            ))}
          </div>
        )}
      </TxContainer>
    </Modal>
  );
};
