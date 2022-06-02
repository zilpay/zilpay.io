import styles from "./index.module.scss";

import type { SwapPair } from "@/types/swap";

import { ThreeDots } from "react-loader-spinner";
import _Big from "big.js";
import classNames from "classnames";
import { useStore } from "react-stores";
import toformat from 'toformat';
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


const Big = toformat(_Big);
Big.PE = 999;


type Prop = {
  show: boolean;
  pair: SwapPair[];
  direction: SwapDirection;
  gasLimit: _Big;
  onClose: () => void;
};


const tokensMixin = new TokensMixine();
const dex = new DragonDex();
export var ConfirmSwapModal: React.FC<Prop> = function ({
  show,
  pair,
  direction,
  gasLimit,
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

  const exact = React.useMemo(
    () => BigInt(Big(pair[0].value).mul(dex.toDecimails(pair[0].meta.decimals).round())),
    [pair]
  );
  const limit = React.useMemo(
    () => BigInt(Big(pair[1].value).mul(dex.toDecimails(pair[1].meta.decimals).round())),
    [pair]
  );

  const tokensPrices = React.useMemo(() => {
    if (priceRevert) {
      return [
        pair[0],
        pair[1],
      ];
    } else {
      return [
        pair[1],
        pair[0],
      ];
    }
  }, [priceRevert, pair]);

  const gasFee = React.useMemo(() => {
    if (!show) {
      return Big(0);
    }

    const gasPrice = Big(DEFAUL_GAS.gasPrice);
    const li = gasLimit.mul(gasPrice);

    return li.div(dex.toDecimails(6));
  }, [direction, show, gasLimit]);

  const expectedOutput = React.useMemo(() => {
    const [, limitToken] = pair;
    const limit = Big(limitToken.value);
    return limit.round(12).toFormat();
  }, [pair]);

  const priceImpact = React.useMemo(() => {
    const [exactToken, limitToken] = pair;
    const expectInput = Big(exactToken.value);
    const limitInput = Big(limitToken.value);
    let price = Big(0);
    let x = String(0);
    let y = String(0);
    let zilReserve = Big(0);
    let tokensReserve = Big(0);

    try {
      switch (direction) {
        case SwapDirection.ZilToToken:
          [x, y] = liquidity.pools[limitToken.meta.base16];
          zilReserve = Big(String(x)).div(dex.toDecimails(exactToken.meta.decimals));
          tokensReserve = Big(String(y)).div(dex.toDecimails(limitToken.meta.decimals));
          price = zilReserve.div(tokensReserve);
          return dex.calcPriceImpact(expectInput, limitInput, price);
        case SwapDirection.TokenToZil:
          [x, y] = liquidity.pools[exactToken.meta.base16];
          zilReserve = Big(String(x)).div(dex.toDecimails(limitToken.meta.decimals));
          tokensReserve = Big(String(y)).div(dex.toDecimails(exactToken.meta.decimals));
          price = tokensReserve.div(zilReserve);
          return dex.calcPriceImpact(expectInput, limitInput, price);
        case SwapDirection.TokenToTokens:
          const [zilliqa] = $tokens.state.tokens;
          const [inputZils, inputTokens] = liquidity.pools[exactToken.meta.base16];
          const [outpuZils, outputTokens] = liquidity.pools[limitToken.meta.base16];

          const bigInputZils = Big(String(inputZils)).div(dex.toDecimails(zilliqa.meta.decimals));
          const bigInputTokens = Big(String(inputTokens)).div(dex.toDecimails(exactToken.meta.decimals));
  
          const bigOutpuZils = Big(String(outpuZils)).div(dex.toDecimails(zilliqa.meta.decimals));
          const bigOutputTokens = Big(String(outputTokens)).div(dex.toDecimails(limitToken.meta.decimals));

          const inputRate = bigInputTokens.div(bigInputZils);
          const outpuRate = bigOutputTokens.div(bigOutpuZils);
          price = inputRate.div(outpuRate);

          return dex.calcPriceImpact(expectInput, limitInput, price);
        default:
          return 0;
      }
    } catch (err) {
      // console.error(err);
      return 0;
    }
  }, [direction, pair, liquidity]);

  const expectedOutputAfterSleepage = React.useMemo(() => {
    const [, limitToken] = pair;
    return Big(dex.sleepageCalc(String(limitToken.value))).round(12).toFormat();
  }, [pair]);

  const approveToken = React.useCallback(async() => {
    const [exactToken] = pair;
    const owner = String(wallet?.base16).toLowerCase();
    const token = $tokens.state.tokens.find(
      (t) => t.meta.base16 === exactToken.meta.base16
    );
    const balance = token?.balance[owner] || '0';
    await tokensMixin.increaseAllowance(
      dex.contract,
      exactToken.meta.base16,
      balance
    );
  }, [wallet, pair]);

  const hanldeUpdate = React.useCallback(async() => {
    const [exactToken] = pair;
    if (exactToken.meta.base16 === ZERO_ADDR) {
      setIsAllow(true);
      setLoading(false);
      return;
    };

    setLoading(true);
    try {
      const allowances = await tokensMixin.getAllowances(
        dex.contract,
        exactToken.meta.base16
      );
      setIsAllow(
        tokensMixin.isAllow(String(exact), String(allowances))
      );
    } catch (err) {
      console.error('hanldeUpdate', err);
    }
    setLoading(false);
  }, [pair, exact]);

  const hanldeOnSwap = React.useCallback(async() => {
    setLoading(true);

    try {
      const zilpay = await tokensMixin.zilpay.zilpay();

      if (!wallet || !zilpay.wallet.isEnable) {
        await zilpay.wallet.connect();
      }

      switch (direction) {
        case SwapDirection.ZilToToken:
          await dex.swapExactZILForTokens(exact, limit, pair[1].meta);
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
          await dex.swapExactTokensForZIL(exact, limit, pair[0].meta);
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
            pair[0].meta,
            pair[1].meta
          );
          setLoading(false);
          onClose();
          return;
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }, [
    pair,
    isAllow,
    exact,
    limit,
    direction,
    wallet,
    onClose,
    approveToken
  ]);

  React.useEffect(() => {
    hanldeUpdate();
  }, []);

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
          value={Big(pair[0].value)}
          token={pair[0].meta}
          disabled
        />
        <br />
        <FormInput
          value={Big(pair[1].value)}
          token={pair[1].meta}
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
                {expectedOutput} {pair[1].meta.symbol}
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
                {expectedOutputAfterSleepage} {pair[1].meta.symbol}
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
