import "@/styles/components/screen-modal";

import React from "react";

type Prop = {
  show: boolean;
  onClose: () => void;
};

export var ScreenModal: React.FC<Prop> = function ({
  children,
  show,
  onClose
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
      ref={(n) => (node.current = n)}
      className={'screen-modal ' + show ? `show-dialog` : ``}
      onClick={onToggle}
    >
      {children}
    </div>
  );
};
