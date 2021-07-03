import React from 'react';

const { window } = global;

let observer = null;

export function useZilPay() {
  const [zilpay, setZilPay] = React.useState({
    code: 0,
    instance: null
  });

  function subscribe() {
    if (observer) {
      return null;
    }

    if (window['zilPay'].wallet.isConnect && zilPay.wallet.isEnable) {
      setZilPay({
        instance: window['zilPay'],
        code: 1
      });
      observer = window['zilPay']
      .wallet
      .observableAccount()
      .subscribe(() => setZilPay({
        instance: window['zilPay'],
        code: 1
      }));
    }
  }

  if (process.browser) {
    setTimeout(() => {
      subscribe();
    }, 500);
  }

  if (zilpay.code === 1) {
    return zilpay;
  }

  if (process.browser && typeof window['zilPay'] !== 'undefined') {
    setZilPay({
      instance: window['zilPay'],
      code: 1
    });

    return zilpay;
  } else {
    let k = 0;
    const i = setInterval(() => {
      if (zilpay.code !== 0 && k >= 5) {
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
        clearInterval(i);
      }
    }, 100);
  }

  return zilpay;
}
