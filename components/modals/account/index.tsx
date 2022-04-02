import styles from "./index.module.scss";

import React from "react";
import { useStore } from "react-stores";
import { useTranslation } from "next-i18next";

import { Modal, ModalHeader } from "components/modal";
import { TxCard } from "components/tx-card";
import { $transactions } from "store/transactions";
import { AccountCard } from "@/components/account-card";

import type { Wallet } from "@/types/wallet";

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
  const { transactions } = useStore($transactions);

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
      <div className={styles.txlist}>
        {transactions.length === 0 ? (
          <p className={styles.here}>
            {common.t(`tx_appear_here`)}
          </p>
        ) : (
          <div>
            <div className={styles.header}>
              <p>
                {common.t(`recent_txns`)}
              </p>
              <p className={styles.clear}>
                (
                {common.t(`clear_all`)}
                )
              </p>
            </div>
            {transactions.map((tx) => (
              <TxCard key={tx.hash} tx={tx} />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
