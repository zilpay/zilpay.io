import "@/styles/components/modals/_no-wallet.scss";

import React from "react";
import Image from "next/image";

import { Modal, ModalHeader } from "components/modal";


type Prop = {
  show: boolean;
  message: string;
  onClose: () => void;
};


export var WalletErrorModal: React.FC<Prop> = function ({
  show,
  message,
  onClose
}) {
  return (
    <Modal
      show={show}
      title={(
        <ModalHeader onClose={onClose}>
          {message}
        </ModalHeader>
      )}
      onClose={onClose}
    >
      <div className="no-wallet">
        <p>
          For playing this NFT game, you need install the best ZIlliqa wallet
          (ZIlPay).
        </p>
        <a href="https://zilpay.io/" target="_blank" rel="noreferrer">
          <Image
            src="/imgs/zil-pay-logo.png"
            width="150"
            height="150"
            alt="ZIlPay Logo"
          />
        </a>
      </div>
    </Modal>
  );
};
