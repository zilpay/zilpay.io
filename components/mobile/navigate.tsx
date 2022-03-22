import React from "react";
import { useStore } from "effector-react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

import { Text } from "components/text";

import { ThreeDots } from "react-loader-spinner";
import { $transactions } from "store/transactions";
import { Colors } from "@/config/colors";
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

const Container = styled.div`
  background: #14161c;
  justify-content: space-between;
  padding-bottom: 30px;
`;
const ConnectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  background: transparent;
  color: ${Colors.Muted};
  border-radius: 16px;
  padding: 17px 68px;
  min-width: 230px;
  cursor: pointer;
  border: 1px solid ${Colors.Muted};
`;

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
      <Container className="modal-content">
        <ConnectButton onClick={hanldeMenuOrConnect}>
          {loading ? (
            <>
              <ThreeDots color="#fff" height={10} width={20} />
              <Text css="text-indent: 5px;margin: 0;">
                {common.t(`pending`)}
              </Text>
            </>
          ) : (
            connectText
          )}
        </ConnectButton>
      </Container>
    </ScreenModal>
  );
};
