import "@/styles/components/modals/_confirm-swap.scss";

import type { TokenState } from "@/types/token";

import { ThreeDots } from "react-loader-spinner";
import Big from "big.js";
import React from "react";
import { useStore } from "effector-react";
import { useTranslation } from "next-i18next";

import { Modal, ModalHeader } from "components/modal";
import { FormInput } from "components/dex/input";

import { DragonDex, SwapDirection } from "@/mixins/dex";

import { $wallet } from "@/store/wallet";


type Prop = {
  show: boolean;
  exactToken: TokenState;
  limitToken: TokenState;
  exact: Big;
  limit: Big;
  direction: SwapDirection;
  onClose: () => void;
};


const dex = new DragonDex();
export var ConfirmSwapModal: React.FC<Prop> = function ({
  show,
  exact,
  limit,
  exactToken,
  limitToken,
  direction,
  onClose
}) {
  const common = useTranslation(`common`);
  const wallet = useStore($wallet);

  const [loading, setLoading] = React.useState(false);

  const hanldeOnSwap = React.useCallback(async() => {
    if (!wallet) {
      return;
    }

    setLoading(true);

    try {
      switch (direction) {
        case SwapDirection.ZilToToken:
          const res0 = await dex.swapExactZILForTokens(
            exact,
            limit,
            wallet.base16,
            limitToken.base16
          );    
          console.log(res0);
        case SwapDirection.TokenToZil:
          const res = await dex.swapExactTokensForZIL(
            exact,
            limit,
            wallet.base16,
            exactToken.base16
          );
          console.log(res);
          break;
        case SwapDirection.TokenToTokens:
          const res1 = await dex.swapExactTokensForTokens(
            exact,
            limit,
            wallet.base16,
            exactToken.base16,
            limitToken.base16
          );
          console.log(res1);
          break;
      }
      onClose();
    } catch {
      ///
    }

    setLoading(false);
  }, [exact, limit, direction, wallet, exactToken, limitToken]);

  return (
    <Modal
      show={show}
      title={(
        <ModalHeader onClose={onClose}>
          {common.t(`confirm_swap`)}
        </ModalHeader>
      )}
      width="450px"
      onClose={onClose}
    >
      <div className="confirm-swap">
        <FormInput
          value={exact.div(dex.toDecimails(exactToken.decimals))}
          token={exactToken}
          disabled
        />
        <br />
        <FormInput
          value={limit.div(dex.toDecimails(limitToken.decimals))}
          token={limitToken}
          disabled
        />
        <button
          onClick={hanldeOnSwap}
          disabled={loading}
        >
          {loading ? (
            <ThreeDots
              color="var(--button-color)"
              height={25}
              width={50}
            />
          ) : 'Confirm Swap'}
        </button>
      </div>
    </Modal>
  );
};
