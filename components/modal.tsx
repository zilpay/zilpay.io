import "@/styles/components/modal";

import React from "react";

import { CloseIcon } from "components/icons/close";


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
    <div
      className={'modal-container ' + show ? `show-dialog` : ``}
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
    </div>
  );
};

export const ModalHeader: React.FC<HeadProp> = ({
  children,
  onClose
}) => (
  <div className="modal-header">
    <h3>{children}</h3>
    <span onClick={onClose}>
      <CloseIcon />
    </span>
  </div>
);
