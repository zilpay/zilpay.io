import React from "react";
import { useStore } from "effector-react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

import { Modal, ModalHeader } from "components/modal";

type Prop = {
  show: boolean;
  onClose: () => void;
};

export var ConfirmSwapModal: React.FC<Prop> = function ({
  show,
  onClose
}) {
  const common = useTranslation(`common`);

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
      dasdasd
    </Modal>
  );
};
