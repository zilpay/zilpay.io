import React from 'react';

const { window } = global;
import { ZilPayType } from 'types';

type ZIlPayInstance = {
  code: number;
  instance: ZilPayType | null;
};

const zilpayLink = (): ZilPayType => {
  return (window as any)['zilPay'];
};

export function useZilPay() {
  const [zilpay, setZilPay] = React.useState<ZIlPayInstance>({
    code: 0,
    instance: null
  });

  if (zilpay.code === 1 || zilpay.code === -1) {
    return zilpay;
  }

  if (process.browser && typeof zilpayLink() !== 'undefined') {
    setZilPay({
      instance: zilpayLink(),
      code: 1
    });

    if (!zilpayLink().wallet.isConnect || !zilpayLink().wallet.isEnable) {
      zilpayLink().wallet.connect().then(() => {
        setZilPay({
          instance: zilpayLink(),
          code: 1
        });
      });
    }

    return zilpay;
  }

  if (process.browser) {
    let k = 0;
    const i = setInterval(() => {
      if (k >= 3) {
        setZilPay({
          instance: null,
          code: -1
        });
        clearInterval(i);
        return null;
      }

      if (process.browser && zilpayLink) {
        setZilPay({
          instance: zilpayLink(),
          code: 1
        });

        if (!zilpayLink().wallet.isConnect || !zilpayLink().wallet.isEnable) {
          zilpayLink().wallet.connect().then(() => {
            setZilPay({
              instance: zilpayLink(),
              code: 1
            });
          });
        }

        clearInterval(i);
      }
      k++;
    }, 100);
  }

  return zilpay;
}
