import styles from './index.module.scss';

import React from "react";
import { useTranslation } from "next-i18next";

import { Modal, ModalHeader } from "components/modal";
import Big from 'big.js';


type Prop = {
  show: boolean;
  amount: Big;
  limit: Big;
  tokenIndex: number;
  onClose: () => void;
};

export var AddPoolPreviewModal: React.FC<Prop> = function ({
  show,
  amount,
  limit,
  onClose
}) {
  const common = useTranslation(`common`);

  return (
    <Modal
      show={show}
      title={(
        <ModalHeader onClose={onClose}>
          {common.t(`add_poo_preview`)}
        </ModalHeader>
      )}
      width="390px"
      onClose={onClose}
    >
      <div className={styles.container}>
        <div className={styles.head}></div>
        <div className={styles.info}></div>
        <div className={styles.price}></div>
      </div>
    </Modal>
  );
};
