import styles from "./index.module.scss";

import type { TokenState } from "@/types/token";

import { ThreeDots } from "react-loader-spinner";
import Big from "big.js";
import classNames from "classnames";
import { useStore } from "react-stores";
import React from "react";
import { useTranslation } from "next-i18next";

import { Modal, ModalHeader } from "components/modal";
import { FormInput } from "@/components/swap-form";

import { DragonDex, SwapDirection } from "@/mixins/dex";

import { $wallet } from "@/store/wallet";
import { TokensMixine } from "@/mixins/token";
import { $tokens } from "@/store/tokens";
import { ZERO_ADDR } from "@/config/conts";


type Prop = {
  show: boolean;
  exactToken: TokenState;
  limitToken: TokenState;
  exact: Big;
  limit: Big;
  direction: SwapDirection;
  onClose: () => void;
};


const tokensMixin = new TokensMixine();
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
  const swap = useTranslation(`swap`);
  const wallet = useStore($wallet);

  const [loading, setLoading] = React.useState(false);
  const [isAllow, setIsAllow] = React.useState(false);

  const approveToken = async() => {
    const owner = String(wallet?.base16).toLowerCase();
    const token = $tokens.state.tokens.find(
      (t) => t.meta.base16 === exactToken.base16
    );
    const balance = token?.balance[owner] || '0';
    await tokensMixin.increaseAllowance(
      DragonDex.CONTRACT,
      exactToken.base16,
      balance
    );
  };

  const hanldeUpdate = React.useCallback(async() => {
    if (exactToken.base16 === ZERO_ADDR) {
      setIsAllow(true);
      return
    };

    setLoading(true);
    try {
      const allowances = await tokensMixin.getAllowances(
        DragonDex.CONTRACT,
        exactToken.base16
      );
      setIsAllow(
        tokensMixin.isAllow(String(exact), String(allowances))
      );
    } catch {
      /////
    }
    setLoading(false);
  }, [exactToken, exact]);

  const hanldeOnSwap = React.useCallback(async() => {
    if (!wallet) {
      return;
    }

    setLoading(true);

    try {
      switch (direction) {
        case SwapDirection.ZilToToken:
          await dex.swapExactZILForTokens(
            exact,
            limit,
            wallet.base16,
            limitToken.base16
          );    
          onClose();
          return;
        case SwapDirection.TokenToZil:
          if (!isAllow) {
            await approveToken();
            setLoading(false);
            setIsAllow(true);
            return;
          }
          await dex.swapExactTokensForZIL(
            exact,
            limit,
            wallet.base16,
            exactToken.base16
          );
          onClose();
          return;
        case SwapDirection.TokenToTokens:
          if (!isAllow) {
            await approveToken();
            setLoading(false);
            setIsAllow(true);
            return;
          }
          await dex.swapExactTokensForTokens(
            exact,
            limit,
            wallet.base16,
            exactToken.base16,
            limitToken.base16
          );
          onClose();
          return;
      }
    } catch {
      ///
    }

    setLoading(false);
  }, [isAllow, exact, limit, direction, wallet, exactToken, limitToken, onClose]);

  React.useEffect(() => {
    if (show) {
      hanldeUpdate();
    }
  }, [show, wallet]);

  return (
    <Modal
      show={show}
      title={(
        <ModalHeader onClose={onClose}>
          {swap.t(`modals.confirm.title`)}
        </ModalHeader>
      )}
      width="450px"
      onClose={onClose}
    >
      <div className={styles.container}>
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
          className={classNames(styles.submit, {
            allow: isAllow
          })}
          onClick={hanldeOnSwap}
          disabled={loading}
        >
          {isAllow ? (
            <>
              {loading ? (
                <ThreeDots
                  color="var(--button-color)"
                  height={25}
                  width={50}
                />
              ) : swap.t(`modals.confirm.btn`)}
            </>
          ) : common.t('buttons.approve')}
        </button>
      </div>
    </Modal>
  );
};
