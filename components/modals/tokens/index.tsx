import styles from './index.module.scss';

import type { Pool, TokenState } from "@/types/token";

import { useStore } from "react-stores";
import React from "react";
import { useTranslation } from "next-i18next";
import Image from 'next/image';
import Link from 'next/link';

import { Modal, ModalHeader } from "components/modal";

import { $wallet } from "@/store/wallet";
import { getIconURL } from '@/lib/viewblock';
import { formatNumber } from '@/filters/n-format';
import Big from 'big.js';

type Prop = {
  show: boolean;
  pools: Pool[];
  warn?: boolean;
  include?: boolean;
  onClose: () => void;
  onSelect: (token: TokenState) => void;
};

Big.PE = 999;

const getAmount = (decimals: number, balance?: bigint) => {
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
  pools = [],
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
        {pools.map((pool) => (
          <div
            key={pool.meta.base16}
            className={styles.tokencard}
            onClick={() => onSelect(pool.meta)}
          >
            <Image
              src={getIconURL(pool.meta.bech32)}
              alt={pool.meta.symbol}
              lazyRoot={lazyRoot}
              height="30"
              width="30"
            />
            <div className={styles.tokenwrapper}>
              <p className={styles.left}>
                {pool.meta.symbol}
              </p>
              <p className={styles.right}>
                {pool.meta.name}
              </p>
            </div>
            <p>
              {String(getAmount(pool.meta.decimals, pool.balance[wallet?.base16 || '']))}
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
