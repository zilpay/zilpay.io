import styles from './index.module.scss';

import React from 'react';
import { useStore } from 'react-stores';
import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';

import { $wallet } from '@/store/wallet';
import { $liquidity } from '@/store/shares';
import { $tokens } from '@/store/tokens';

import { nPool } from '@/filters/n-pool';
import { formatNumber } from '@/filters/n-format';
import { getIconURL } from '@/lib/viewblock';

import { SHARE_PERCENT_DECIMALS, ZERO_BECH32 } from '@/config/conts';


export const PoolOverview: React.FC = () => {
  const wallet = useStore($wallet);
  const liquidity = useStore($liquidity);
  const tokensStore = useStore($tokens);

  const ownerLising = React.useMemo(() => {
    if (!wallet) {
      return [];
    }

    const { pools, shares } = liquidity;
    const tokens = [];
    const owner = String(wallet.base16).toLowerCase();

    for (const token in shares) {
      if (shares[token][owner]) {
        const found = tokensStore.tokens.find((p) => p.meta.base16 === token);

        if (found) {
          tokens.push({
            meta: found.meta,
            pool: nPool(pools[token], shares[token][owner]),
            share: Number(shares[token][owner]) / SHARE_PERCENT_DECIMALS
          });
        }
      }
    }

    return tokens;
  }, [wallet, liquidity, tokensStore]);

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
      {ownerLising.length === 0 ? (
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
          {ownerLising.map((el) => (
            <div
              className={styles.poolcard}
              key={el.meta.base16}
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
                    src={getIconURL(el.meta.bech32)}
                    alt="tokens-logo"
                    height="30"
                    width="30"
                    className={classNames(styles.symbol)}
                  />
                </div>
                <p>
                  ZIL / {el.meta.symbol} - <span>
                    {el.share}%
                  </span>
                </p>
              </div>
              <div className={styles.cardrow}>
                <p className={styles.amount}>
                  {formatNumber(el.pool[0])} / {formatNumber(el.pool[1])} ≈ $32
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
