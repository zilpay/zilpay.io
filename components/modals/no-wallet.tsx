import React from "react";
import styled from "styled-components";
import Image from "next/image";

import { Modal } from "components/modal";
import { Text } from "components/text";
import { CloseIcon } from "components/icons/close";

import { Colors } from "config/colors";

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
const Between = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  align-items: center;

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

export var WalletErrorModal: React.FC<Prop> = function ({
  show,
  message,
  onClose,
}) {
  return (
    <Modal
      show={show}
      title={(
        <Between>
          <Text fontColors={Colors.Warning} css="padding: 0 16px;">
            {message}
          </Text>
          <span onClick={onClose}>
            <CloseIcon color={Colors.Warning} />
          </span>
        </Between>
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
