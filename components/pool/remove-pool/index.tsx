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
import { FormInput, SwapSettings } from '@/components/swap-form';
import { BackIcon } from '@/components/icons/back';

import Big from 'big.js';
import { nPool } from '@/filters/n-pool';


type Prop = {
  token: Token;
};

const dex = new DragonDex();
export const RemovePoolForm: React.FC<Prop> = ({ token }) => {
  const wallet = useStore($wallet);
  const liquidity = useStore($liquidity);
  const tokensStore = useStore($tokens);

  const tokenAddress = React.useMemo(() => {
    return String(token.meta.base16).toLowerCase();
  }, [token]);
  const pool = React.useMemo(() => {
    return liquidity.pools[tokenAddress];
  }, [liquidity, token, tokenAddress]);
  const poolValues = React.useMemo(() => {
    try {
      const zil = tokensStore.tokens[0].meta;
      const owner = String(wallet?.base16).toLowerCase();
      const [x, y] = nPool(pool, liquidity.shares[tokenAddress][owner]);
      const zilReserve = Big(x.toString()).div(dex.toDecimails(zil.decimals));
      const tokenReserve = Big(y.toString()).div(dex.toDecimails(token.meta.decimals));
  
      return [zilReserve, tokenReserve];
    } catch {
      return [Big(0), Big(0)];
    }
  }, [pool, wallet, liquidity, tokenAddress, tokensStore, token]);

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
        <FormInput
          value={poolValues[0]}
          token={tokensStore.tokens[0].meta}
          balance={tokensStore.tokens[0].balance[String(wallet?.base16).toLowerCase()]}
        />
        <br />
        <FormInput
          value={poolValues[1]}
          token={token.meta}
          balance={token.balance[String(wallet?.base16).toLowerCase()]}
        />
      </div>
      <button>
        Remove
      </button>
    </div>
  );
};
