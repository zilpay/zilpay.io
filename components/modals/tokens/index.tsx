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
import { $tokens } from '@/store/tokens';

type Prop = {
  show: boolean;
  warn?: boolean;
  include?: boolean;
  exceptions?: string[];
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
  exceptions = [],
  warn = false,
  include = false
}) {
  const common = useTranslation(`common`);
  const wallet = useStore($wallet);
  const tokensStore = useStore($tokens);

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const lazyRoot = React.useRef(null);

  const [isImport, setImport] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [base16, setBase16] = React.useState('');
  const [search, setSearch] = React.useState('');

  const tokens = React.useMemo(() => {
    return tokensStore.tokens.filter(
      (t) => t.meta.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [tokensStore, search]);

  const hanldeInput = React.useCallback(async(event: React.FormEvent<HTMLInputElement>) => {
    try {
      const zp = await zilpay.zilpay();
      const base16 = zp.crypto.fromBech32Address((event.target as HTMLInputElement).value);

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

  const hanldeOnSelect = React.useCallback((token: TokenState) => {
    if (exceptions.includes(token.base16)) {
      return;
    }

    onSelect(token);
  }, [exceptions]);

  const handleSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [first] = tokens;

    if (first) {
      hanldeOnSelect(first.meta);
    }
  }, [tokens]);

  React.useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, show]);

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
        <form
          className={styles.listwarp}
          onSubmit={handleSubmit}
        >
          <input
            className={styles.search}
            placeholder={'Symbol'}
            ref={inputRef}
            onInput={(event) => setSearch(event.currentTarget.value)}
          />
          <ul
            className={styles.container}
            ref={lazyRoot}
          >
            {tokens.map((token) => (
              <li
                key={token.meta.base16}
                className={styles.tokencard}
                onClick={() => hanldeOnSelect(token.meta)}
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
              </li>
            ))}
          </ul>
        </form>
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
