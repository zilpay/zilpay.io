import React from "react";
import styled from "styled-components";
import Image from "next/image";

import { Modal, ModalHeader } from "components/modal";
import { Text } from "components/text";

type Prop = {
  show: boolean;
  message: string;
  onClose: () => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 30px;
  text-align: center;
`;


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
      <Container>
        <Text>
          For playing this NFT game, you need install the best ZIlliqa wallet
          (ZIlPay).
        </Text>
        <a href="https://zilpay.io/" target="_blank" rel="noreferrer">
          <Image
            src="/imgs/zil-pay-logo.png"
            width="150"
            height="150"
            alt="ZIlPay Logo"
          />
        </a>
      </Container>
    </Modal>
  );
};
