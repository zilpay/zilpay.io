import styles from './index.module.scss';

import React from "react";
import { useTranslation } from "next-i18next";

import { Modal, ModalHeader } from "components/modal";

import { BLOCKS, SLIPPAGE } from "@/config/conts";

import { $settings } from "@/store/settings";
import { useStore } from "react-stores";

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
    $settings.setState({
      ...settings,
      slippage: SLIPPAGE
    });
  }, [settings]);
  const hanldeResetBlocks = React.useCallback(() => {
    $settings.setState({
      ...settings,
      blocks: BLOCKS
    });
  }, [settings]);
  const hanldeInputSlippage = React.useCallback((event) => {
    $settings.setState({
      ...settings,
      slippage: Number(event.target.value)
    });
  }, [settings]);
  const hanldeInputBlocks = React.useCallback((event) => {
    $settings.setState({
      ...settings,
      blocks: Number(event.target.value)
    });
  }, [settings]);

  return (
    <Modal
      show={show}
      title={(
        <ModalHeader onClose={onClose}>
          {common.t(`settings.title`)}
        </ModalHeader>
      )}
      width="390px"
      onClose={onClose}
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <p>
            {common.t('settings.slippage')}
          </p>
          <div className={styles.row}>
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
        <div className={styles.wrapper}>
          <p>
            {common.t('settings.deadline')}
          </p>
          <div className={styles.row}>
            <button onClick={hanldeResetBlocks}>
              Auto
            </button>
            <label>
              <input
                type="number"
                value={settings.blocks}
                onInput={hanldeInputBlocks}
              />
              {common.t('settings.blocks')}
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
};
