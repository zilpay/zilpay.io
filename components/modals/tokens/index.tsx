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
import { ZilPayBase } from '@/mixins/zilpay-base';
import { DragonDex } from '@/mixins/dex';
import { ThreeDots } from 'react-loader-spinner';

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

const zilpay = new ZilPayBase();
const dex = new DragonDex();
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

  const [isImport, setImport] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [base16, setBase16] = React.useState('');

  const hanldeInput = React.useCallback(async(event) => {
    try {
      const zp = await zilpay.zilpay();
      const base16 = zp.crypto.fromBech32Address(event.target.value);

      setBase16(base16);
    } catch {
      ///
    }
  }, []);

  const hanldeAddToken = React.useCallback(async() => {
    if (!wallet?.base16) return;

    setLoading(true);
    try {
      await dex.addCustomToken(base16, wallet.base16);
      setImport(false);
    } catch (err) {
      console.warn(err);
      ///
    }
    setLoading(false);
  }, [wallet, base16]);

  return (
    <Modal
      show={show}
      title={(
        <ModalHeader onClose={onClose}>
          {common.t(`tokens.title`)}
        </ModalHeader>
      )}
      width="400px"
      onClose={onClose}
    >
      {warn ? (
        <div className={styles.warnwrapper}>
          <p className={styles.warn}>
            {common.t('tokens.warn')}
          </p>
        </div>
      ) : null}
      {isImport ? (
        <div className={styles.import}>
          <div>
            <p>
              {common.t('tokens.import_warn')}
            </p>
          </div>
          <input
            type="text"
            placeholder={common.t('tokens.placeholder')}
            onInput={hanldeInput}
          />
          <div className={styles.buttons}>
            <button
              disabled={!Boolean(base16)}
              onClick={hanldeAddToken}
            >
              {loading ? (
                <ThreeDots
                  height="30"
                  width="30"
                  color="var(--primary-color)"
                />
              ) : common.t('tokens.buttons.add')}
            </button>
            <button onClick={() => setImport(false)}>
              {common.t('tokens.buttons.cancel')}
            </button>
          </div>
        </div>
      ) : (
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
                height="50"
                width="50"
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
      )}
      <div className={styles.include}>
        {include && !isImport ? (
          <p onClick={() => setImport(true)}>
            {common.t('tokens.buttons.import')}
          </p>
        ) : null}
      </div>
    </Modal>
  );
};
