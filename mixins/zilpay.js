import React from 'react';

const { window } = global;


export function useZilPay() {
  const [zilpay, setZilPay] = React.useState({
    code: 0,
    instance: null
  });

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
