import 'rc-slider/assets/index.css';
import styles from './index.module.scss';

import type { Token } from '@/types/token';

import React from 'react';
import { useStore } from 'react-stores';
import Link from 'next/link';

import { $wallet } from '@/store/wallet';
import { $liquidity } from '@/store/shares';
import { $tokens } from '@/store/tokens';
import { DragonDex } from '@/mixins/dex';

import { ImagePair } from '@/components/pair-img';
import { FormInput } from '@/components/swap-form';
import { BackIcon } from '@/components/icons/back';
import Slider from 'rc-slider';

import Big from 'big.js';
import { nPool } from '@/filters/n-pool';
import { ThreeDots } from 'react-loader-spinner';


type Prop = {
  token: Token;
};

const dex = new DragonDex();
export const RemovePoolForm: React.FC<Prop> = ({ token }) => {
  const wallet = useStore($wallet);
  const liquidity = useStore($liquidity);
  const tokensStore = useStore($tokens);

  const [loading, setLoading] = React.useState(false);

  const [zilReserve, setZilReserve] = React.useState(Big(0));
  const [tokenReserve, setTokenReserve] = React.useState(Big(0));
  const [pool, setPool] = React.useState(liquidity.pools[String(token.meta.base16).toLowerCase()]);
  const [userContributions, setUserContributions] = React.useState(
    liquidity.balances[String(token.meta.base16).toLowerCase()][String(wallet?.base16).toLowerCase()]
  );

  const [zil, setZil] = React.useState(Big(0));
  const [zrc, setZrc] = React.useState(Big(0));

  const tokenAddress = React.useMemo(() => {
    return String(token.meta.base16).toLowerCase();
  }, [token]);

  const hanldeOnRemove = React.useCallback(async() => {
    setLoading(true);
    try {
      if (!wallet?.base16) {
        throw new Error();
      }
      const zilToken = tokensStore.tokens[0].meta;
      const minZIL = zil.mul(dex.toDecimails(zilToken.decimals));
      const minZrc = zrc.mul(dex.toDecimails(token.meta.decimals));
      const res = await dex.removeLiquidity(minZIL, minZrc, tokenAddress, wallet?.base16);

      console.log(res);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [zil, zrc, tokenAddress, wallet]);

  React.useEffect(() => {
    try {
      const zil = tokensStore.tokens[0].meta;
      const owner = String(wallet?.base16).toLowerCase();
      const [x, y] = nPool(pool, liquidity.shares[tokenAddress][owner]);
      const zilReserve = Big(x.toString()).div(dex.toDecimails(zil.decimals));
      const tokenReserve = Big(y.toString()).div(dex.toDecimails(token.meta.decimals));
  
      setZilReserve(zilReserve.mul(dex.toDecimails(zil.decimals)));
      setTokenReserve(tokenReserve.mul(dex.toDecimails(token.meta.decimals)));
      setZil(zilReserve);
      setZrc(tokenReserve);
    } catch (err) {
      // console.error(err);
    }
  }, [pool, wallet, liquidity, tokenAddress, tokensStore, token]);

  const hanldeRange = React.useCallback((range) => {
    console.log(range);
  }, []);

  React.useEffect(() => {
    if (wallet) {
      setLoading(true);

      dex
        .getUserDexContributions(tokenAddress, wallet.base16)
        .then((res) => {
          setPool([
            BigInt(res.pool[0]),
            BigInt(res.pool[1])
          ]);
          setUserContributions(res.userContributions);
        })
        .finally(() => setLoading(false));
    }
  }, [wallet, tokenAddress]);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Link href="/pool" passHref>
          <div className={styles.hoverd}>
            <BackIcon />
          </div>
        </Link>
        <h3>
          Remove liquidity
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
          min={0}
          max={100}
          step={1}
          onChange={hanldeRange}
        />
        <div className={styles.cards}>
          <div className={styles.card}>
            {String(zil.round(10))} <span>
              {tokensStore.tokens[0].meta.symbol}
            </span>
          </div>
          <svg
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
            height="30"
          >
            <path
              d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"
              fill='var(--primary-color)'
            />
          </svg>
          <div className={styles.card}>
            {String(zrc.round(10))} <span>
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
          ) : 'Remove'}
      </button>
    </div>
  );
};
