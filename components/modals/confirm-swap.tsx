import type { TokenState } from "@/types/token";

import { ThreeDots } from "react-loader-spinner";
import Big from "big.js";
import React from "react";
import { useStore } from "effector-react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

import { Modal, ModalHeader } from "components/modal";
import { FormInput } from "components/dex/input";

import { DragonDex, SwapDirection } from "@/mixins/dex";

import { Colors } from "@/config/colors";

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

const Container = styled.div`
  padding: 10px;
`;
const Button = styled.button`
  width: 100%;
  padding: 20px;

  font-size: 16px;
  text-transform: uppercase;

  margin-block-end: 0.6em;
  margin-block-start: 0.6em;

  background: ${Colors.Primary};
  color: ${Colors.Button};
`;

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
      <Container>
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
        <Button
          onClick={hanldeOnSwap}
          disabled={loading}
        >
          {loading ? (
            <ThreeDots
              color={Colors.Button}
              height={25}
              width={50}
            />
          ) : 'Confirm Swap'}
        </Button>
      </Container>
    </Modal>
  );
};
