import styles from './index.module.scss';

import { useTranslation } from 'next-i18next';
import React from 'react';

import SafariIcon from 'components/icons/safari';
import ChromeIcon from 'components/icons/chrome';
import FireFoxIcon from 'components/icons/firefox';

type Prop = {
  userAgent?: string;
};

const iconSize = 50;
export const SmartButton: React.FC<Prop> = ({ userAgent }) => {
  const main = useTranslation(`main`);

  const isFirefox = React.useMemo(() => Boolean(String(userAgent).match(
    /Firefox/i
  )), [userAgent]);
  const isSafari = React.useMemo(() => Boolean(String(userAgent).match(
    /Safari/i
  )), [userAgent]);
  const isChrome = React.useMemo(() => Boolean(String(userAgent).match(
    /Chrome/i
  )), [userAgent]);

  if (isChrome) {
    return (
      <a
        className={styles.button}
        href="https://chrome.google.com/webstore/detail/zilpay/klnaejjgbibmhlephnhpmaofohgkpgkd"
        target="_blank"
      >
        <ChromeIcon
          height={iconSize}
          width={iconSize}
          color="var(--primary-color)"
        />
        <b>
          {main.t('main.button.chrome')}
        </b>
      </a>
    );
  }

  if (isSafari) {
    return (
      <a
        className={styles.button}
        href="https://apps.apple.com/ru/app/zilpay-extension/id1598114655?l=en&mt=12"
        target="_blank"
      >
        <SafariIcon
          height={iconSize}
          width={iconSize}
          color="var(--primary-color)"
        />
        <b>
          {main.t('main.button.safari')}
        </b>
      </a>
    );
  }

  if (isFirefox) {
    return (
      <a
        className={styles.button}
        href="https://addons.mozilla.org/en-GB/firefox/addon/zilpay/"
        target="_blank"
      >
        <FireFoxIcon
          height={iconSize}
          width={iconSize}
          color="var(--primary-color)"
        />
        <b>
          {main.t('main.button.firefox')}
        </b>
      </a>
    );
  }

  return (
    <div className={styles.row}>
      <FireFoxIcon
        height={iconSize}
        width={iconSize}
        color="var(--primary-color)"
      />
      <ChromeIcon
        height={iconSize}
        width={iconSize}
        color="var(--primary-color)"
      />
      <SafariIcon
        height={iconSize}
        width={iconSize}
        color="var(--primary-color)"
      />
    </div>
  );
};
