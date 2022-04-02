import styles from './index.module.scss';

import type { Wallet } from '@/types/wallet';

import React from "react";
import { useStore } from 'react-stores';

import { AccountModal } from '@/components/modals/account/index';
import { ThreeDots } from 'react-loader-spinner';

import { $wallet } from '@/store/wallet';
import { $transactions } from '@/store/transactions';
import { $net } from '@/store/netwrok';

import { ZilPayBase } from '@/mixins/zilpay-base';
import { trim } from '@/lib/trim';

const zilPayWallet = new ZilPayBase();
let observer: any = null;
let observerNet: any = null;
let observerBlock: any = null;
export const ConnectZIlPay: React.FC = function () {
  const wallet = useStore($wallet);
  const { transactions } = useStore($transactions);

  const [accountModal, setAccountModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(``);

  const isLoading = React.useMemo(
    () => transactions.filter((tx) => !tx.confirmed).length === 0,
    [transactions],
  );

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
      });

      observer = zp.wallet.observableAccount().subscribe((acc: Wallet) => {
        const address = $wallet.state;

        if (address?.base16 !== acc.base16) {
          $wallet.setState(acc);
        }

        $transactions.resetState();

        const cache = window.localStorage.getItem(
          String(zp.wallet.defaultAccount?.base16),
        );

        if (cache) {
          $transactions.setState(JSON.parse(cache));
        }
      });

      // observerBlock = zp.wallet
      //   .observableBlock()
      //   .subscribe(async (block: Block) => {
      //     console.log(block);
      //     let list = $transactions.getState();

      //     const params = list
      //       .filter((tx) => !tx.confirmed)
      //       .map((tx) => tx.hash);

      //     if (params.length === 0) {
      //       return null;
      //     }

      //     // const res = await blockchain.getTransaction(...params);
      //     // writeNewList(list);
      //   });

      if (zp.wallet.defaultAccount) {
        $wallet.setState(zp.wallet.defaultAccount);
      }
    },
    [transactions],
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
      setError(String((err as any).message));
    }

    setLoading(false);
  };

  React.useEffect(() => {
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
  }, []);

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
              <ThreeDots
                color="var(--text-color)"
                height={10}
                width={20}
              />
              <b>
                Pending...
              </b>
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
