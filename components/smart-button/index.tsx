import styles from './index.module.scss';

import React from 'react';

import SafariIcon from 'components/icons/safari';
import ChromeIcon from 'components/icons/chrome';
import FireFoxIcon from 'components/icons/firefox';

type Prop = {
  userAgent?: string;
};

export const SmartButton: React.FC<Prop> = ({ userAgent }) => {
  const isFirefox = Boolean(String(userAgent).match(
    /Firefox/i
  ));
  const isSafari = Boolean(String(userAgent).match(
    /Safari/i
  ));
  const isChrome = Boolean(String(userAgent).match(
    /Chrome/i
  ));

  if (isChrome) {
    return (
      <div className={styles.button}>
        <ChromeIcon
          height={60}
          width={60}
          color="var(--button-color)"
        />
      </div>
    );
  }

  if (isSafari) {
    return (
      <a className={styles.button}>
        <SafariIcon
          height={60}
          width={60}
          color="var(--button-color)"
        />
      </a>
    );
  }

  if (isFirefox) {
    return (
      <a className={styles.button}>
        <FireFoxIcon
          height={60}
          width={60}
          color="var(--button-color)"
        />
      </a>
    );
  }

  return (
    <div className={styles.row}>
      <FireFoxIcon
        height={60}
        width={60}
        color="var(--button-color)"
      />
      <ChromeIcon
        height={60}
        width={60}
        color="var(--button-color)"
      />
      <SafariIcon
        height={60}
        width={60}
        color="var(--button-color)"
      />
    </div>
  );
};
