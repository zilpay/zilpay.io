import styles from './index.module.scss';

import React from 'react';
import { useStore } from 'react-stores';
import classNames from 'classnames';
import Big from 'big.js';
import Link from 'next/link';
import { Puff } from 'react-loader-spinner';
import { useTranslation } from 'next-i18next';

import { ImagePair } from '@/components/pair-img';

import { $wallet } from '@/store/wallet';
import { $liquidity } from '@/store/shares';
import { $tokens } from '@/store/tokens';

import { nPool } from '@/filters/n-pool';
import { formatNumber } from '@/filters/n-format';

import { DEFAULT_CURRENCY, SHARE_PERCENT_DECIMALS } from '@/config/conts';
import { DragonDex } from '@/mixins/dex';
import { $settings } from '@/store/settings';

type Prop = {
  loading: boolean;
};

const dex = new DragonDex();
export const PoolOverview: React.FC<Prop> = ({ loading }) => {
  const pool = useTranslation(`pool`);

  const wallet = useStore($wallet);
  const liquidity = useStore($liquidity);
  const tokensStore = useStore($tokens);
  const settings = useStore($settings);

  const list = React.useMemo(() => {
    if (!wallet) {
      return [];
    }
    const tokens = [];
    const owner = String(wallet.base16).toLowerCase();
    const zilToken = tokensStore.tokens[0].meta;
    const { pools, shares } = liquidity;
    const rate = Big(settings.rate);

    for (const token in shares) {
      try {
        const foundIndex = tokensStore.tokens.findIndex((t) => t.meta.base16 === token);
        const pool = pools[token];
        const share = shares[token][owner];
        const limitToken = tokensStore.tokens[foundIndex];
        const [x, y] = nPool(pool, share);
        const zilReserve = Big(x.toString()).div(dex.toDecimails(zilToken.decimals));
        const tokenReserve = Big(y.toString()).div(dex.toDecimails(limitToken.meta.decimals));
        const zilsTokens = dex.tokensToZil(tokenReserve, foundIndex);
        const zils = zilReserve.add(zilsTokens);

        tokens.push({
          token: limitToken.meta,
          zilReserve: formatNumber(String(zilReserve)),
          tokenReserve: formatNumber(String(tokenReserve)),
          price: formatNumber(String(zils.mul(rate)), DEFAULT_CURRENCY),
          share: Number(share) / SHARE_PERCENT_DECIMALS
        });
      } catch {
        continue;
      }
    }

    return tokens;
  }, [wallet, liquidity, tokensStore, settings]);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h3>
          {pool.t('overview.title')}
        </h3>
        <Link href="/pool/add" passHref>
          <button>
            {pool.t('overview.button')}
          </button>
        </Link>
      </div>
      {list.length === 0 ? (
        <div className={styles.wrapper}>
          {loading ? (
            <Puff color="var(--primary-color)"/>
          ) : (
            <>
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
                {pool.t('overview.info')}
              </p>
            </>
          )}
        </div>
      ) : (
        <div className={classNames(styles.wrapper, styles.cardwrapper)}>
          {list.map((el) => (
            <Link
              href={`/pool/${el.token.base16}`}
              key={el.token.base16}
              passHref
            >
              <div className={styles.poolcard}>
                <div className={styles.cardrow}>
                  <ImagePair
                    tokens={[
                      tokensStore.tokens[0].meta,
                      el.token
                    ]}
                  />
                  <p>
                    ZIL / {el.token.symbol} - <span>
                      {el.share}%
                    </span>
                  </p>
                </div>
                <div className={styles.cardrow}>
                  <p className={styles.amount}>
                    {el.zilReserve} / {el.tokenReserve} ≈ {el.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
