import React from "react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

import { Modal } from "components/modal";
import { Text } from "components/text";
import { CloseIcon } from "components/icons/close";
import { Colors } from "config/colors";

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

export var SwapSettingsModal: React.FC<Prop> = function ({
  show,
  onClose
}) {
  const common = useTranslation(`common`);

  return (
    <Modal
      show={show}
      title={(
        <Between>
          <Text css="padding: 0 16px;">{common.t(`settings`)}</Text>
          <span onClick={onClose}>
            <CloseIcon />
          </span>
        </Between>
      )}
      width="450px"
      onClose={onClose}
    >
      dasdasdasdasdas
    </Modal>
  );
};
