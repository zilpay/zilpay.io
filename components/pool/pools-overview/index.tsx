import styles from './index.module.scss';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getIconURL } from '@/lib/viewblock';
import { ZERO_BECH32 } from '@/config/conts';
import classNames from 'classnames';


const list = [
  {
    token: {
      symbol: 'WTF',
      bech32: 'zil1l0g8u6f9g0fsvjuu74ctyla2hltefrdyt7k5f4'
    },
    share: 0.3
  }
];

export const PoolOverview: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h3>
          Pools Overview
        </h3>
        <Link href="/pool/add" passHref>
          <button>
            + New pool
          </button>
        </Link>
      </div>
      {list.length === 0 ? (
        <div className={styles.wrapper}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--muted-color)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
            <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
          </svg>
          <p>
            Your active liquidity positions will appear here.
          </p>
        </div>
      ) : (
        <div className={classNames(styles.wrapper, styles.cardwrapper)}>
          {list.map((el) => (
            <div
              className={styles.poolcard}
              key={el.token.bech32}
            >
              <div className={styles.cardrow}>
                <div className={styles.imgwrap}>
                  <Image
                    src={getIconURL(ZERO_BECH32)}
                    alt="tokens-logo"
                    height="30"
                    width="30"
                    className={styles.symbol}
                  />
                  <Image
                    src={getIconURL(el.token.bech32)}
                    alt="tokens-logo"
                    height="30"
                    width="30"
                    className={classNames(styles.symbol)}
                  />
                </div>
                <p>
                  ZIL / {el.token.symbol} - <span>
                    {el.share}%
                  </span>
                </p>
              </div>
              <div className={styles.cardrow}>
                <p className={styles.amount}>
                  321321 ZIL / 232132 {el.token.symbol} ≈ $32
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
