import styles from "./index.module.scss";

import { useTranslation } from 'next-i18next';
import React from 'react';
import Link from 'next/link';

import AppleIcon from "@/components/icons/apple";
import ChromeIcon from "@/components/icons/chrome";
import EmailIcon from "@/components/icons/email";
import FireFoxIcon from "@/components/icons/firefox";
import GitHubIcon from "@/components/icons/github";
import GoogleIcon from "@/components/icons/google";
import MediumIcon from "@/components/icons/medium";
import TelegramIcon from "@/components/icons/telegram";
import TwitterIcon from "@/components/icons/twitter";
import SafariIcon from "../icons/safari";
import { AppLinks } from "@/config/links";

export const Footer: React.FC = () => {
  const { t } = useTranslation(`common`);

  return (
  <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.office}>
          <h3>
            {t(`office`)}
          </h3>
          <p>
            {t(`office_value`)}
          </p>
        </div>
        <div className={styles.involved}>
          <h3>
            {t(`footer_icons`)}
          </h3>
          <div>
            <a
              href={AppLinks.SAFARI}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SafariIcon
                color="var(--text-color)"
                height="27"
                width="27"
              />
            </a>
            <a
              href={AppLinks.IOS}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppleIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href={AppLinks.GOOGLE}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GoogleIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href={AppLinks.FIREFOX}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FireFoxIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href={AppLinks.CHROME}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ChromeIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://t.me/zilpaychat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TelegramIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://twitter.com/pay_zil"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href="mailto:contact@zilpay.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <EmailIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://github.com/zilpay"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://medium.com/@lich666black"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MediumIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
          </div>
        </div>
        <div className={styles.legal}>
          <h3>
            {t(`legal`)}
          </h3>
          <Link href="/terms" passHref>
            <p className={styles.pointer}>
              {t(`terms`)}
            </p>
          </Link>
          <Link href="/policy" passHref>
            <p className={styles.pointer}>
              {t(`privacy`)}
            </p>
          </Link>
          <Link href="/extension-policy" passHref>
            <p className={styles.pointer}>
              {t(`extension-policy`)}
            </p>
          </Link>
          <Link href="/dex-policy" passHref>
            <p className={styles.pointer}>
              {t(`dex-policy`)}
            </p>
          </Link>
          <a
            href="https://zilpay.github.io/zilpay-docs/"
            target="_blanck"
          >
            <p className={styles.pointer}>
              Documentation
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};
