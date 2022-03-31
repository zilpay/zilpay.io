import "@/styles/components/get-btn";

import React from 'react';
import { useTranslation } from 'next-i18next';
import {
  isChrome,
  isEdge,
  isFirefox,
  isAndroid,
  isIOS
} from 'react-device-detect';

export const InstallButton: React.FC = () => {
  const { t } = useTranslation(`main`);

 if (isAndroid) {
    return (
      <a href="https://play.google.com/store/apps/details?id=com.zilpaymobile">
        <button className="get-btn">
          {t(`get_android`)}
        </button>
      </a>
    );
  } if (isIOS) {
    return (
      <a href="https://apps.apple.com/ru/app/zilpay/id1547105860">
        <button className="get-btn">
          {t(`get_ios`)}
        </button>
      </a>
    );
  } if (isChrome) {
    return (
      <a href="https://chrome.google.com/webstore/detail/zilpay/klnaejjgbibmhlephnhpmaofohgkpgkd">
        <button className="get-btn">
          {t(`get_chrome`)}
        </button>
      </a>
    );
  } if (isEdge) {
    return (
      <a href="https://microsoftedge.microsoft.com/addons/detail/zilpay/fbekallmnjoeggkefjkbebpineneilec">
        <button className="get-btn">
          {t(`get_edge`)}
        </button>
      </a>
    );
  } if (isFirefox) {
    return (
      <a href="https://addons.mozilla.org/en-GB/firefox/addon/zilpay/">
        <button className="get-btn">
          {t(`get_firefox`)}
        </button>
      </a>
    );
  }

  return null;
};

export default InstallButton;
