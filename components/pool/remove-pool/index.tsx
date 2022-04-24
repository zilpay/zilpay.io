import 'rc-slider/assets/index.css';
import styles from './index.module.scss';

import type { Token } from '@/types/token';

import React from 'react';
import { useStore } from 'react-stores';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Big from 'big.js';

import { $wallet } from '@/store/wallet';
import { $liquidity } from '@/store/shares';
import { $tokens } from '@/store/tokens';
import { DragonDex } from '@/mixins/dex';

import { ImagePair } from '@/components/pair-img';
import { BackIcon } from '@/components/icons/back';
import Slider from 'rc-slider';

import { nPool } from '@/filters/n-pool';
import { ThreeDots } from 'react-loader-spinner';
import { formatNumber } from '@/filters/n-format';
import { SHARE_PERCENT_DECIMALS } from '@/config/conts';

Big.PE = 999;

type Prop = {
  token: Token;
};

const dex = new DragonDex();
export const RemovePoolForm: React.FC<Prop> = ({ token }) => {
  const pool = useTranslation(`pool`);

  const wallet = useStore($wallet);
  const liquidity = useStore($liquidity);
  const tokensStore = useStore($tokens);

  const [loading, setLoading] = React.useState(false);

  const [zilReserve, setZilReserve] = React.useState(Big(0));
  const [tokenReserve, setTokenReserve] = React.useState(Big(0));

  const [zil, setZil] = React.useState(Big(0));
  const [zrc, setZrc] = React.useState(Big(0));
  const [range, setRange] = React.useState(1);
  const [userContributions, setUserContributions] = React.useState(Big(0));

  const tokenAddress = React.useMemo(() => {
    return String(token.meta.base16).toLowerCase();
  }, [token]);
  const owner = React.useMemo(() => {
    return String(wallet?.base16).toLowerCase();
  }, [wallet]);

  const hanldeOnRemove = React.useCallback(async() => {
    setLoading(true);
    try {
      if (!owner) {
        throw new Error();
      }
      const zilToken = tokensStore.tokens[0].meta;
      const minZIL = zil.mul(dex.toDecimails(zilToken.decimals));
      const minZrc = zrc.mul(dex.toDecimails(token.meta.decimals));
      const res = await dex.removeLiquidity(
        minZIL,
        minZrc,
        userContributions,
        tokenAddress,
        owner
      );

      console.log(res);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [zil, zrc, tokenAddress, userContributions, owner, token, tokensStore]);

  const hanldeRange = React.useCallback((range) => {
    const percent = BigInt(range);
    const zil = tokensStore.tokens[0].meta;
    const newZil = (BigInt(String(zilReserve)) * percent) / BigInt(SHARE_PERCENT_DECIMALS);
    const newTokens = (BigInt(String(tokenReserve)) * percent) / BigInt(SHARE_PERCENT_DECIMALS);
    const newUserContributions = (BigInt(liquidity.balances[tokenAddress][owner] || 0) * percent) / BigInt(SHARE_PERCENT_DECIMALS);

    setZil(Big(String(newZil)).div(dex.toDecimails(zil.decimals)));
    setZrc(Big(String(newTokens)).div(dex.toDecimails(token.meta.decimals)));
    setRange(range);
    setUserContributions(Big(String(newUserContributions)));
  }, [zilReserve, tokenReserve, tokensStore, owner, token, liquidity, tokenAddress]);

  React.useEffect(() => {
    try {
      const pool = liquidity.pools[String(token.meta.base16).toLowerCase()];
      const [x, y] = nPool(pool, liquidity.shares[tokenAddress][owner]);

      const zilReserve = Big(x.toString());
      const tokenReserve = Big(y.toString());
  
      setZilReserve(zilReserve);
      setTokenReserve(tokenReserve);
      setUserContributions(Big(liquidity.balances[tokenAddress][owner] || 0));
      hanldeRange(1);
    } catch (err) {
      // console.error(err);
    }
  }, [wallet, liquidity, tokenAddress, tokensStore, token, owner]);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Link href="/pool" passHref>
          <div className={styles.hoverd}>
            <BackIcon />
          </div>
        </Link>
        <h3>
          {pool.t('remove_pool.title')}
        </h3>
        <ImagePair
          tokens={[
            tokensStore.tokens[0].meta,
            token.meta
          ]}
        />
      </div>
      <div className={styles.wrapper}>
        <Slider
          min={1}
          max={100}
          railStyle={{
            backgroundColor: 'var(--button-color)',
            height: '6px'
          }}
          trackStyle={{
            backgroundColor: 'var(--primary-color)',
            height: '6px'
          }}
          handleStyle={{
            height: '17px',
            width: '17px',
            borderColor: 'var(--primary-color)',
            backgroundColor: 'var(--card-color)',
            opacity: '1'
          }}
          step={1}
          onChange={hanldeRange}
        />
        <p>
          {range}%
        </p>
        <div className={styles.cards}>
          <div className={styles.card}>
            {formatNumber(Number(zil))} <span>
              {tokensStore.tokens[0].meta.symbol}
            </span>
          </div>
          <svg
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
            height="30"
            width="30"
          >
            <path
              d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"
              fill='var(--primary-color)'
            />
          </svg>
          <div className={styles.card}>
            {formatNumber(Number(zrc))} <span>
              {token.meta.symbol}
            </span>
          </div>
        </div>
      </div>
      <button onClick={hanldeOnRemove}>
        {loading ? (
          <ThreeDots
              color="var(--button-color)"
              height={25}
              width={50}
            />
          ) : pool.t('remove_pool.button')}
      </button>
    </div>
  );
};
