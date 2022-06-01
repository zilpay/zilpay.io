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
import { TokensMixine } from '@/mixins/token';

Big.PE = 999;

type Prop = {
  token: Token;
};

const tokensMixin = new TokensMixine();
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
      const zilpay = await tokensMixin.zilpay.zilpay();

      if (!wallet || !zilpay.wallet.isEnable) {
        await zilpay.wallet.connect();
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
  }, [zil, zrc, tokenAddress, userContributions, owner, token, tokensStore, wallet]);

  const hanldeRange = React.useCallback((range) => {
    const _100 = BigInt(100);
    const percent = BigInt(range);
    const zil = tokensStore.tokens[0].meta;
    const userContributions = BigInt(liquidity.balances[owner] && liquidity.balances[owner][tokenAddress] || 0);
    const newZil = (BigInt(String(zilReserve)) * percent) / _100;
    const newTokens = (BigInt(String(tokenReserve)) * percent) / _100;
    const newUserContributions = (userContributions * percent) / _100;

    setZil(Big(String(newZil)).div(dex.toDecimails(zil.decimals)));
    setZrc(Big(String(newTokens)).div(dex.toDecimails(token.meta.decimals)));
    setRange(range);
    setUserContributions(Big(String(newUserContributions)));
  }, [zilReserve, tokenReserve, tokensStore, owner, token, liquidity, tokenAddress]);

  React.useEffect(() => {
    try {
      const pool = liquidity.pools[String(token.meta.base16).toLowerCase()];
      const [x, y] = nPool(pool, liquidity.shares[tokenAddress]);

      const zilReserve = Big(x.toString());
      const tokenReserve = Big(y.toString());
  
      setZilReserve(zilReserve);
      setTokenReserve(tokenReserve);
      setUserContributions(Big(liquidity.balances[owner][tokenAddress] || 0));
    } catch (err) {
      // console.error(err);
    }
    // @ts-ignore
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
      <button
        disabled={loading}
        onClick={hanldeOnRemove}
      >
        {loading ? (
          <ThreeDots
              color="var(--primary-color)"
              height={25}
              width={50}
            />
          ) : pool.t('remove_pool.button')}
      </button>
    </div>
  );
};
