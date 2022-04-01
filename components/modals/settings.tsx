import "@/styles/components//modals/_settings-modal.scss";

import React from "react";
import { useStore } from "effector-react";
import { useTranslation } from "next-i18next";

import { Modal, ModalHeader } from "components/modal";

import { BLOCKS, SLIPPAGE } from "@/config/dex";

import { $settings, updateSettings } from "@/store/settings";

type Prop = {
  show: boolean;
  onClose: () => void;
};


export var SwapSettingsModal: React.FC<Prop> = function ({
  show,
  onClose
}) {
  const common = useTranslation(`common`);
  const settings = useStore($settings);

  const hanldeResetSlippage = React.useCallback(() => {
    updateSettings({
      ...settings,
      slippage: SLIPPAGE
    });
  }, [settings]);
  const hanldeResetBlocks = React.useCallback(() => {
    updateSettings({
      ...settings,
      blocks: BLOCKS
    });
  }, [settings]);
  const hanldeInputSlippage = React.useCallback((event) => {
    updateSettings({
      ...settings,
      slippage: Number(event.target.value)
    });
  }, [settings]);
  const hanldeInputBlocks = React.useCallback((event) => {
    updateSettings({
      ...settings,
      blocks: Number(event.target.value)
    });
  }, [settings]);

  return (
    <Modal
      show={show}
      title={(
        <ModalHeader onClose={onClose}>
          {common.t(`settings`)}
        </ModalHeader>
      )}
      width="390px"
      onClose={onClose}
    >
      <div className="settings-modal">
        <div className="wrapper">
          <p>
            Slippage tolerance
          </p>
          <div className="row">
            <button onClick={hanldeResetSlippage}>
              Auto
            </button>
            <label>
              <input
                type="number"
                value={settings.slippage}
                onInput={hanldeInputSlippage}
              />
              %
            </label>
          </div>
        </div>
        <br />
        <div className="wrapper">
          <p>
            Transaction deadline
          </p>
          <div className="row">
            <button onClick={hanldeResetBlocks}>
              Auto
            </button>
            <label>
              <input
                type="number"
                value={settings.blocks}
                onInput={hanldeInputBlocks}
              />
              blacks
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
};
