import styles from './index.module.scss';

import type { Token, TokenState } from "@/types/token";

import { useStore } from "react-stores";
import React from "react";
import { useTranslation } from "next-i18next";
import Image from 'next/image';

import { Modal, ModalHeader } from "components/modal";

import { $wallet } from "@/store/wallet";
import { getIconURL } from '@/lib/viewblock';
import { formatNumber } from '@/filters/n-format';
import Big from 'big.js';

type Prop = {
  show: boolean;
  tokens: Token[];
  warn?: boolean;
  include?: boolean;
  onClose: () => void;
  onSelect: (token: TokenState) => void;
};

Big.PE = 999;

const getAmount = (decimals: number, balance?: string) => {
  if (!balance) {
    return '';
  }

  const qa = Big(String(balance));
  const decimal = Big(10**decimals);
  const value = qa.div(decimal);

  return formatNumber(Number(value));
};

export var TokensModal: React.FC<Prop> = function ({
  show,
  onClose,
  onSelect,
  tokens = [],
  warn = false,
  include = false
}) {
  const common = useTranslation(`common`);
  const wallet = useStore($wallet);

  const lazyRoot = React.useRef(null);

  return (
    <Modal
      show={show}
      title={(
        <ModalHeader onClose={onClose}>
          {common.t(`tokens`)}
        </ModalHeader>
      )}
      width="400px"
      onClose={onClose}
    >
      {warn ? (
        <div className={styles.warnwrapper}>
          <p className={styles.warn}>
            Please check the tokens before investment, check with Terms Of Services.
          </p>
        </div>
      ) : null}
      <div
        className={styles.container}
        ref={lazyRoot}
      >
        {tokens.map((token) => (
          <div
            key={token.meta.base16}
            className={styles.tokencard}
            onClick={() => onSelect(token.meta)}
          >
            <Image
              src={getIconURL(token.meta.bech32)}
              alt={token.meta.symbol}
              lazyRoot={lazyRoot}
              height="30"
              width="30"
            />
            <div className={styles.tokenwrapper}>
              <p className={styles.left}>
                {token.meta.symbol}
              </p>
              <p className={styles.right}>
                {token.meta.name}
              </p>
            </div>
            <p>
              {String(getAmount(token.meta.decimals, token.balance[String(wallet?.base16).toLowerCase()]))}
            </p>
          </div>
        ))}
      </div>
      {include ? (
        <div className={styles.include}>
          <p>
            Import
          </p>
        </div>
      ) : null}
    </Modal>
  );
};
