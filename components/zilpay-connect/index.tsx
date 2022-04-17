import styles from './index.module.scss';

import type { Wallet } from '@/types/wallet';

import React from "react";
import { useStore } from 'react-stores';

import { AccountModal } from '@/components/modals/account/index';
import { ThreeDots } from 'react-loader-spinner';

import { $wallet } from '@/store/wallet';
import { $transactions, updateTransactions } from '@/store/transactions';
import { $net } from '@/store/netwrok';

import { Blockchain } from '@/mixins/custom-fetch';
import { ZilPayBase } from '@/mixins/zilpay-base';
import { trim } from '@/lib/trim';
import { DragonDex } from '@/mixins/dex';
import { loadTokensfromCache } from '@/store/tokens';

const chainFetcher = new Blockchain();
const zilPayWallet = new ZilPayBase();
const dex = new DragonDex();

let observer: any = null;
let observerNet: any = null;
let observerBlock: any = null;
export const ConnectZIlPay: React.FC = function () {
  const wallet = useStore($wallet);
  const transactionsStore = useStore($transactions);

  const [accountModal, setAccountModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const isLoading = React.useMemo(() => {
    const { transactions } = transactionsStore;

    if (transactions.length === 0) {
      return true;
    }
    
    return transactions.filter((tx) => !tx.confirmed).length === 0;
  }, [transactionsStore]);

  const transactionsCheck = async() => {
    let { transactions } = $transactions.state;

    const params = transactions
      .filter((tx) => !tx.confirmed)
      .map((tx) => tx.hash);

    if (params.length === 0) {
      return null;
    }

    const resList = await chainFetcher.getTransaction(...params);

    for (let index = 0; index < transactions.length; index++) {
      try {
        const tx = transactions[index];
        const found = resList.find((res) => res.result.ID === tx.hash);

        if (!found) {
          continue;
        }

        transactions[index].confirmed = true;
        transactions[index].error = !found.result.receipt.success;
      } catch {
        //
      }
    }

    updateTransactions(String($wallet.state?.bech32), transactions);
  };

  const hanldeObserverState = React.useCallback(
    (zp) => {
      $net.setState({
        net: zp.wallet.net
      });

      if (observerNet) {
        observerNet.unsubscribe();
      }
      if (observer) {
        observer.unsubscribe();
      }
      if (observerBlock) {
        observerBlock.unsubscribe();
      }

      observerNet = zp.wallet.observableNetwork().subscribe((net: string) => {
        $net.setState({
          net
        });
        dex.updateTokens();
      });

      observer = zp.wallet.observableAccount().subscribe((acc: Wallet) => {
        const address = $wallet.state;

        if (address?.base16 !== acc.base16) {
          $wallet.setState(acc);
        }

        $transactions.resetState();

        const cache = window.localStorage.getItem(
          String(acc.bech32)
        );

        if (cache) {
          $transactions.setState(JSON.parse(cache));
        }

        dex.updateTokens();
      });

      observerBlock = zp.wallet
        .observableBlock()
        .subscribe(() => {
          transactionsCheck();
          dex.updateTokens();
        });

      if (zp.wallet.defaultAccount) {
        $wallet.setState(zp.wallet.defaultAccount);
      }

      // const cache = window.localStorage.getItem(
      //   String(zp.wallet.defaultAccount?.bech32),
      // );

      // if (cache) {
      //   $transactions.setState(JSON.parse(cache));
      // }

      transactionsCheck();
    },
    [],
  );

  const handleConnect = async() => {
    setLoading(true);

    try {
      const zp = await zilPayWallet.zilpay();
      const connected = await zp.wallet.connect();

      if (connected && zp.wallet.defaultAccount) {
        $wallet.setState(zp.wallet.defaultAccount);
      }

      $net.setState({
        net: zp.wallet.net
      });

      const cache = window.localStorage.getItem(
        String(zp.wallet.defaultAccount?.base16),
      );

      if (cache) {
        $transactions.setState(JSON.parse(cache));
      }
    } catch (err) {
      console.warn(err);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    loadTokensfromCache();
    zilPayWallet
      .zilpay()
      .then((zp) => {
        hanldeObserverState(zp);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });

    return () => {
      if (observer) {
        observer.unsubscribe();
      }
      if (observerNet) {
        observerNet.unsubscribe();
      }
      if (observerBlock) {
        observerBlock.unsubscribe();
      }
    };
  }, [hanldeObserverState]);

  return (
    <>
      <AccountModal
        show={accountModal}
        address={wallet}
        onClose={() => setAccountModal(false)}
      />
      {wallet ? (
        <button
          className={styles.connect}
          onClick={() => setAccountModal(true)}
        >
          {isLoading ? (
            trim(wallet.bech32)
          ) : (
            <>
              <b>
                Pending 
              </b>
              <ThreeDots
                color="var(--text-color)"
                height={10}
                width={15}
              />
            </>
          )}
        </button>
      ) : (
        <button
        className={styles.connect}
          onClick={handleConnect}
        >
          {loading ? (
            <ThreeDots
              color="var(--text-color)"
              height={10}
              width={20}
            />
          ) : (
            `Connect`
          )}
        </button>
      )}
    </>
  );
};
