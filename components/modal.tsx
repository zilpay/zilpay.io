import React from "react";
import styled from "styled-components";

import { Text } from "components/text";
import { CloseIcon } from "components/icons/close";

import { Colors } from "config/colors";

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
const Container = styled.div`
  position: fixed;
  display: none;
  overflow: auto;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 50;

  &.show-dialog {
    display: block;
    background: rgb(0 0 0 / 0.30);

    .modal-md {
      right: 0;
      left: 0;
      margin: 10% auto 50px;
      max-width: 635px;
      width: 95%;
      background: ${Colors.Modal};
      padding: 0;
      z-index: 100;
      border-radius: 16px;
      // box-shadow: 0 0 10px #61006fbf;
      animation: dialog-scale-start 0.3s ease-in-out forwards;
    }
  }
`;

type Prop = {
  title?: React.ReactNode;
  show: boolean;
  width?: string;
  onClose: () => void;
};

type HeadProp = {
  onClose: () => void;
};

export var Modal: React.FC<Prop> = function ({
  children,
  title,
  show,
  width,
  onClose,
}) {
  const node = React.useRef<HTMLDivElement | null>(null);

  const onToggle = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target == node.current) {
        onClose();
      }
    },
    [node],
  );

  return (
    <Container
      className={show ? `show-dialog` : ``}
      ref={(n) => (node.current = n)}
      onClick={onToggle}
    >
      <div
        className="modal-md"
        style={{
          width,
        }}
      >
        {title}
        <div>{children}</div>
      </div>
    </Container>
  );
};

export const ModalHeader: React.FC<HeadProp> = ({
  children,
  onClose
}) => (
  <Between>
    <Text css="padding: 0 16px;">{children}</Text>
    <span onClick={onClose}>
      <CloseIcon />
    </span>
  </Between>
);
