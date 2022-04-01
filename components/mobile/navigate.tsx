import "@/styles/components/_navigate.scss";

import React from "react";
import { useStore } from "effector-react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { ThreeDots } from "react-loader-spinner";
import { $transactions } from "store/transactions";
import { trim } from "@/lib/trim";
import { Wallet } from "@/store/wallet";
import { ScreenModal } from "@/components/screen-modal";

type Prop = {
  show: boolean;
  loading: boolean;
  wallet: Wallet | null;
  onConnect: () => void;
  onClose: () => void;
};


export var MobileNavigate: React.FC<Prop> = function ({
  show,
  loading,
  onConnect,
  wallet,
  onClose,
}) {
  const common = useTranslation(`common`);
  const router = useRouter();
  const txList = useStore($transactions);
  const [showMenu, setShowMenu] = React.useState(false);

  const connectText = React.useMemo(() => {
    if (showMenu && wallet) {
      return common.t(`cancel`);
    }
    if (wallet) {
      return trim(wallet.bech32);
    }
    return common.t(`connect`);
  }, [wallet, showMenu]);

  const hanldeNavigate = React.useCallback((path: string) => {
    router.push(path);
    onClose();
  }, []);

  const hanldeMenuOrConnect = React.useCallback(() => {
    if (showMenu) {
      setShowMenu(false);
    } else if (wallet) {
      setShowMenu(true);
    } else {
      onConnect();
    }
  }, [showMenu, wallet]);

  return (
    <ScreenModal show={show} onClose={() => null}>
      <div className="navigate modal-content">
        <button onClick={hanldeMenuOrConnect}>
          {loading ? (
            <>
              <ThreeDots color="var(--text-color)" height={10} width={20} />
              <p>
                {common.t(`pending`)}
              </p>
            </>
          ) : (
            connectText
          )}
        </button>
      </div>
    </ScreenModal>
  );
};
