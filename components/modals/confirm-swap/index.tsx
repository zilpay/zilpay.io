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
import { DEFAULT_CURRENCY, ZERO_ADDR } from "@/config/conts";
import { $settings } from "@/store/settings";
import { DEFAUL_GAS } from "@/mixins/zilpay-base";
import { PriceInfo } from "@/components/price-info";
import { formatNumber } from "@/filters/n-format";
import { $liquidity } from "@/store/shares";


Big.PE = 999;


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
  const settings = useStore($settings);
  const liquidity = useStore($liquidity);

  const [loading, setLoading] = React.useState(true);
  const [isAllow, setIsAllow] = React.useState(false);
  const [priceRevert, setPriceRevert] = React.useState(true);

  const tokensPrices = React.useMemo(() => {
    if (priceRevert) {
      return [exactToken, limitToken];
    }

    return [limitToken, exactToken];
  } , [priceRevert, exactToken, limitToken]);
  const gasFee = React.useMemo(() => {
    const gasLimit = dex.calcGasLimit(direction);
    const gasPrice = Big(DEFAUL_GAS.gasPrice);
    const li = gasLimit.mul(gasPrice);

    return li.div(dex.toDecimails(6));
  }, [direction]);

  const expectedOutput = React.useMemo(() => {
    const value = limit.div(dex.toDecimails(limitToken.decimals));
    return String(value);
  }, [limit, limitToken]);

  const priceImpact = React.useMemo(() => {
    const expectInput = exact.div(dex.toDecimails(exactToken.decimals));
    const limitInput = limit.div(dex.toDecimails(limitToken.decimals));
    let price = Big(0);
    let x = BigInt(0);
    let y = BigInt(0);
    let zilReserve = Big(0);
    let tokensReserve = Big(0);

    try {
      switch (direction) {
        case SwapDirection.ZilToToken:
          [x, y] = liquidity.pools[limitToken.base16];
          zilReserve = Big(String(x)).div(dex.toDecimails(exactToken.decimals));
          tokensReserve = Big(String(y)).div(dex.toDecimails(limitToken.decimals));
          price = zilReserve.div(tokensReserve);
          return dex.calcPriceImpact(expectInput, limitInput, price);
        case SwapDirection.TokenToZil:
          [x, y] = liquidity.pools[exactToken.base16];
          zilReserve = Big(String(x)).div(dex.toDecimails(limitToken.decimals));
          tokensReserve = Big(String(y)).div(dex.toDecimails(exactToken.decimals));
          price = tokensReserve.div(zilReserve);
          return dex.calcPriceImpact(expectInput, limitInput, price);
        case SwapDirection.TokenToTokens:
          return 0;
        default:
          return 0;
      }
    } catch {
      return 0;
    }
  }, [exact, limit, liquidity, limitToken, exactToken, direction]);

  const expectedOutputAfterSleepage = React.useMemo(() => {
    const bigValue = BigInt(String(limit));
    const value = Big(String(dex.sleepageCalc(bigValue)));
    return String(value.div(dex.toDecimails(limitToken.decimals)));
  }, [limit, limitToken]);

  const approveToken = React.useCallback(async() => {
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
  }, [wallet, exactToken]);

  const hanldeUpdate = React.useCallback(async() => {
    if (exactToken.base16 === ZERO_ADDR) {
      setIsAllow(true);
      setLoading(false);
      return;
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
          setLoading(false);
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
          setLoading(false);
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
          setLoading(false);
          onClose();
          return;
      }
    } catch {
      ///
    }

    setLoading(false);
  }, [
    isAllow,
    exact,
    limit,
    direction,
    wallet,
    exactToken,
    limitToken,
    onClose,
    approveToken
  ]);

  React.useEffect(() => {
    if (show) {
      hanldeUpdate();
    }
  }, [show, wallet, hanldeUpdate]);

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
        <PriceInfo
          tokens={tokensPrices}
          onClick={() => setPriceRevert(!priceRevert)}
        />
        <div className={styles.info}>
          <div className={styles.column}>
            <div className={styles.row}>
              <p>
                {swap.t(`modals.confirm.expected_output`)}
              </p>
              <p>
                {expectedOutput} {limitToken.symbol}
              </p>
            </div>
            <div className={styles.row}>
              <p>
                {swap.t(`modals.confirm.price_impact`)}
              </p>
              <p>
                {String(priceImpact)}%
              </p>
            </div>
          </div>
          <div className={classNames(styles.column, 'muted')}>
            <div className={styles.row}>
              <p>
                {swap.t(`modals.confirm.min_slippage`)} ({settings.slippage}%)
              </p>
              <p>
                {expectedOutputAfterSleepage} {limitToken.symbol}
              </p>
            </div>
            <div className={styles.row}>
              <p>
                {swap.t(`modals.confirm.fee`)}
              </p>
              <p>
                {String(gasFee)}ZIL ({formatNumber(Number(gasFee) * settings.rate, DEFAULT_CURRENCY)})
              </p>
            </div>
          </div>
        </div>
        <button
          className={classNames(styles.submit, {
            allow: isAllow
          })}
          onClick={hanldeOnSwap}
          disabled={loading}
        >
          {loading ? (
            <ThreeDots
              color="var(--button-color)"
              height={25}
              width={50}
            />
          ) : (
            <>
              {isAllow ? swap.t(`modals.confirm.btn`) : common.t('buttons.approve')}
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};
