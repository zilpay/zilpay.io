import React from "react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

import { Modal, ModalHeader } from "components/modal";
import { Text } from "components/text";

type Prop = {
  show: boolean;
  onClose: () => void;
};

export var SwapSettingsModal: React.FC<Prop> = function ({
  show,
  onClose
}) {
  const common = useTranslation(`common`);

  return (
    <Modal
      show={show}
      title={(
        <ModalHeader onClose={onClose}>
          {common.t(`settings`)}
        </ModalHeader>
      )}
      width="450px"
      onClose={onClose}
    >
      dasdasdasdasdas
    </Modal>
  );
};
