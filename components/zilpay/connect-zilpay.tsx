import React from "react";
import { useStore } from "effector-react";
import { isMobile } from "react-device-detect";

import { Puff, ThreeDots } from "react-loader-spinner";

import { MobileNavigate } from "components/mobile/navigate";
import { AccountModal } from "components/modals/account";
import { Text } from "components/text";
import { WalletErrorModal } from "components/modals/no-wallet";

import { ZilPayBase } from "@/mixins/zilpay-base";
import { trim } from "lib/trim";
import { $wallet, updateAddress, Wallet } from "store/wallet";
import {
  $transactions,
  updateTxList,
  clearTxList
} from "store/transactions";
import { updateNet } from "store/wallet-netwrok";

import { Block, Net } from "@/types/zilpay";


let observer: any = null;
let observerNet: any = null;
let observerBlock: any = null;
export var ConnectZIlPay: React.FC = function () {
  const address = useStore($wallet);
  const transactions = useStore($transactions);

  const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [error, setError] = React.useState(``);

  const isLoading = React.useMemo(
    () => transactions.filter((tx) => !tx.confirmed).length === 0,
    [transactions],
  );

  const hanldeObserverState = React.useCallback(
    (zp) => {
      updateNet(zp.wallet.net);

      if (observerNet) {
        observerNet.unsubscribe();
      }
      if (observer) {
        observer.unsubscribe();
      }
      if (observerBlock) {
        observerBlock.unsubscribe();
      }

      observerNet = zp.wallet.observableNetwork().subscribe((net: Net) => {
        updateNet(net);
      });

      observer = zp.wallet.observableAccount().subscribe((acc: Wallet) => {
        const address = $wallet.getState();

        if (address?.base16 !== acc.base16) {
          updateAddress(acc);
        }

        clearTxList();

        const cache = window.localStorage.getItem(
          String(zp.wallet.defaultAccount?.base16),
        );

        if (cache) {
          updateTxList(JSON.parse(cache));
        }
      });

      observerBlock = zp.wallet
        .observableBlock()
        .subscribe(async (block: Block) => {
          console.log(block);
          let list = $transactions.getState();

          const params = list
            .filter((tx) => !tx.confirmed)
            .map((tx) => tx.hash);

          if (params.length === 0) {
            return null;
          }

          // const res = await blockchain.getTransaction(...params);
          // writeNewList(list);
        });

      if (zp.wallet.defaultAccount) {
        updateAddress(zp.wallet.defaultAccount);
      }

      const cache = window.localStorage.getItem(
        String(zp.wallet.defaultAccount?.base16),
      );

      if (cache) {
        updateTxList(JSON.parse(cache));
      }
    },
    [transactions],
  );
  const handleConnect = React.useCallback(async () => {
    setLoading(true);
    try {
      const wallet = new ZilPayBase();
      const zp = await wallet.zilpay();
      const connected = await zp.wallet.connect();

      if (connected && zp.wallet.defaultAccount) {
        updateAddress(zp.wallet.defaultAccount);
      }

      updateNet(zp.wallet.net);

      const cache = window.localStorage.getItem(
        String(zp.wallet.defaultAccount?.base16),
      );

      if (cache) {
        updateTxList(JSON.parse(cache));
      }
    } catch (err) {
      setError(String((err as any).message));
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    const wallet = new ZilPayBase();

    wallet
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

  if (address && isMobile) {
    return (
      <>
        <div onClick={() => setShowModal(true)}>
          <svg width="32" height="26" viewBox="0 0 32 26" fill="none">
            <path
              d="M0 1H32M0 13H32M0 25H32"
              stroke="var(--primary-color)"
              strokeWidth="2"
            />
          </svg>
        </div>
        <MobileNavigate
          show={showModal}
          loading={!isLoading}
          wallet={address}
          onConnect={handleConnect}
          onClose={() => setShowModal(false)}
        />
      </>
    );
  }

  return (
    <>
      {address ? (
        <React.Fragment>
          <button
            className="connect"
            onClick={() => setShowModal(true)}
          >
            {isLoading ? (
              trim(address.bech32)
            ) : (
              <>
                <Puff
                  color="var(--primary-color)"
                  height={10}
                  width={10}
                />
                <Text size="16px" css="text-indent: 5px;margin: 0;">
                  Pending...
                </Text>
              </>
            )}
          </button>
        </React.Fragment>
      ) : (
        <button
          className="connect"
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
      <AccountModal
        show={showModal}
        address={address}
        onClose={() => setShowModal(false)}
      />
      <WalletErrorModal
        show={Boolean(error)}
        message={error}
        onClose={() => setError(``)}
      />
    </>
  );
};
