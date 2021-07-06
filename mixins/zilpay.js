import React from 'react';

const { window } = global;


export function useZilPay() {
  const [zilpay, setZilPay] = React.useState({
    code: 0,
    instance: null
  });

  if (zilpay.code === 1 || zilpay.code === -1) {
    return zilpay;
  }

  if (process.browser && typeof window['zilPay'] !== 'undefined') {
    setZilPay({
      instance: window['zilPay'],
      code: 1
    });

    if (!window['zilPay'].wallet.isConnect || !window['zilPay'].wallet.isEnable) {
      window['zilPay'].wallet.connect().then(() => {
        setZilPay({
          instance: window['zilPay'],
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

      if (process.browser && window['zilPay']) {
        setZilPay({
          instance: window['zilPay'],
          code: 1
        });

        if (!window['zilPay'].wallet.isConnect || !window['zilPay'].wallet.isEnable) {
          window['zilPay'].wallet.connect().then(() => {
            setZilPay({
              instance: window['zilPay'],
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
