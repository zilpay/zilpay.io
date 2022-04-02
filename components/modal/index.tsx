import styles from "./index.module.scss";

import React from "react";

import { CloseIcon } from "components/icons/close";
import classNames from "classnames";


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
    [node, onClose],
  );

  return (
    <div
      className={classNames(styles.container, {
        'show-dialog': show
      })}
      ref={(n) => (node.current = n)}
      onClick={onToggle}
    >
      <div
        className={styles.modalmd}
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
  <div className={styles.modalheader}>
    <h3>{children}</h3>
    <span onClick={onClose}>
      <CloseIcon />
    </span>
  </div>
);
