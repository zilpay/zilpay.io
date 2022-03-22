import React from "react";
import styled from "styled-components";

type Prop = {
  show: boolean;
  onClose: () => void;
};

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
    background: rgb(0 0 0 / 59%);

    .modal-content {
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      position: fixed;

      display: flex;
      flex-direction: column;
      align-items: center;

      left: 10%;
      right: 10%;

      z-index: 100;

      @media (max-width: 500px) {
        left: 0;
        right: 0;
      }
    }
  }
`;

export var ScreenModal: React.FC<Prop> = function ({
  children,
  show,
  onClose,
}) {
  const node = React.useRef<HTMLDivElement | null>(null);

  const onToggle = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target == node.current) {
        onClose();
      }
    },
    [node, onClose],
  );

  return (
    <Container
      ref={(n) => (node.current = n)}
      className={show ? `show-dialog` : ``}
      onClick={onToggle}
    >
      {children}
    </Container>
  );
};
