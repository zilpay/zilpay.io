import "@/styles/components/modals/_account.scss";

import React from "react";
import { useStore } from "effector-react";
import { useTranslation } from "next-i18next";

import { Modal, ModalHeader } from "components/modal";
import { TxCard } from "components/tx-card";
import { $transactions } from "store/transactions";
import { AccountCard } from "@/components/account-card";

import { Wallet } from "@/store/wallet";

type Prop = {
  show: boolean;
  address: Wallet | null;
  onClose: () => void;
};


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
      <div className="tx-list">
        {txList.length === 0 ? (
          <p className="here">
            {common.t(`tx_appear_here`)}
          </p>
        ) : (
          <div>
            <div className="header">
              <p>
                {common.t(`recent_txns`)}
              </p>
              <p className="clear">
                (
                {common.t(`clear_all`)}
                )
              </p>
            </div>
            {txList.map((tx) => (
              <TxCard key={tx.hash} tx={tx} />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
