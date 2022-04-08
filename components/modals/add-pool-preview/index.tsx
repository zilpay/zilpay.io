import styles from './index.module.scss';

import React from "react";
import { useTranslation } from "next-i18next";
import Image from 'next/image';
import { useStore } from 'react-stores';
import Big from 'big.js';
import { ThreeDots } from 'react-loader-spinner';

import { ImagePair } from '@/components/pair-img';
import { Modal, ModalHeader } from "components/modal";

import { $tokens } from '@/store/tokens';
import { getIconURL } from '@/lib/viewblock';
import classNames from 'classnames';
import { DragonDex } from '@/mixins/dex';


type Prop = {
  show: boolean;
  amount: Big;
  limit: Big;
  tokenIndex: number;
  onClose: () => void;
};

const dex = new DragonDex();
export var AddPoolPreviewModal: React.FC<Prop> = function ({
  show,
  amount,
  limit,
  tokenIndex,
  onClose
}) {
  const common = useTranslation(`common`);
  const tokensStore = useStore($tokens);

  const [loading, setLoading] = React.useState(false);

  const token0 = React.useMemo(() => {
    return tokensStore.tokens[0].meta;
  }, [tokensStore]);
  const token1 = React.useMemo(() => {
    return tokensStore.tokens[tokenIndex].meta;
  }, [tokensStore, tokenIndex]);

  const price = React.useMemo(() => {
    return dex.tokensToZil(Big(1), tokenIndex);
  }, [tokenIndex, amount]);

  const hanldeaddLiquidity = React.useCallback(async() => {
    setLoading(true);
    try {
      const zilDecimals = dex.toDecimails(token0.decimals);
      const tokenDecimails = dex.toDecimails(token1.decimals);
  
      const qaAmount = amount.mul(tokenDecimails).round();
      const qaLimit = limit.mul(zilDecimals).round();

      await dex.addLiquidity(token1.base16, qaAmount, qaLimit);
      onClose();
    } catch {
      /////
    }
    setLoading(false);
  }, [token0, token1, amount, limit, onClose]);

  return (
    <Modal
      show={show}
      title={(
        <ModalHeader onClose={onClose}>
          {common.t(`add_poo_preview`)}
        </ModalHeader>
      )}
      width="390px"
      onClose={onClose}
    >
      <div className={styles.container}>
        <div className={styles.head}>
          <ImagePair
            tokens={[
              token0,
              token1
            ]}
          />
          <span>
            <h3>
              {token0.symbol}
            </h3>
            <h3>
              /
            </h3>
            <h3>
              {token1.symbol}
            </h3>
          </span>
        </div>
        <div className={styles.info}>
          <div className={styles.infoitem}>
            <span>
              <Image
                src={getIconURL(token0.bech32)}
                alt={token0.symbol}
                key={token0.symbol}
                height="30"
                width="30"
              />
              <h3>
                {token0.symbol}
              </h3>
            </span>
            <h3>
              {limit.round(6).toString()}
            </h3>
          </div>
          <div className={styles.infoitem}>
            <span>
              <Image
                src={getIconURL(token1.bech32)}
                alt={token1.symbol}
                key={token1.symbol}
                height="30"
                width="30"
              />
              <h3>
                {token1.symbol}
              </h3>
            </span>
            <h3>
              {amount.round(6).toString()}
            </h3>
          </div>
          <div className={classNames(styles.infoitem, styles.fee)}>
            <p>
              Fee Tier
            </p>
            <p>
              1%
            </p>
          </div>
        </div>
        <div className={styles.price}>
          <p>
            Current price
          </p>
          <h3>
            {price.toString()}
          </h3>
          <p>
            {token0.symbol} per {token1.symbol}
          </p>
        </div>
        <button
          className={styles.submit}
          onClick={hanldeaddLiquidity}
        >
          {loading ? (
            <ThreeDots
              color="var(--button-color)"
              height={25}
              width={50}
            />
          ) : 'Confirm Add'}
        </button>
      </div>
    </Modal>
  );
};
