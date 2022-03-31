import "@/styles/components/footer";

import { useTranslation } from 'next-i18next';
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';


const AppleIcon = dynamic(import(`components/icons/apple`));
const GoogleIcon = dynamic(import(`components/icons/google`));
const FireFoxIcon = dynamic(import(`components/icons/firefox`));
const ChromeIcon = dynamic(import(`components/icons/chrome`));
const TelegramIcon = dynamic(import(`components/icons/telegram`));
const TwitterIcon = dynamic(import(`components/icons/twitter`));
const EmailIcon = dynamic(import(`components/icons/email`));
const GitHubIcon = dynamic(import(`components/icons/github`));
const MediumIcon = dynamic(import(`components/icons/medium`));


export const Footer: React.FC = () => {
  const { t } = useTranslation(`common`);
  return (
    <div className="footer">
      <div className="wrapper">
        <div className="office">
          <h3>
            {t(`office`)}
          </h3>
          <p>
            {t(`office_value`)}
          </p>
        </div>
        <div className="involved">
          <h3>
            {t(`footer_icons`)}
          </h3>
          <div className="involved-wrapper">
            <a
              href="https://apps.apple.com/ru/app/zilpay/id1547105860"
              target="_blank" rel="noreferrer"
            >
              <AppleIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.zilpaymobile"
              target="_blank" rel="noreferrer"
            >
              <GoogleIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://addons.mozilla.org/en-GB/firefox/addon/zilpay/"
              target="_blank" rel="noreferrer"
            >
              <FireFoxIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://chrome.google.com/webstore/detail/zilpay/klnaejjgbibmhlephnhpmaofohgkpgkd"
              target="_blank" rel="noreferrer"
            >
              <ChromeIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://t.me/zilpaychat"
              target="_blank" rel="noreferrer"
            >
              <TelegramIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://twitter.com/pay_zil"
              target="_blank" rel="noreferrer"
            >
              <TwitterIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href="mailto:contact@zilpay.io"
              target="_blank" rel="noreferrer"
            >
              <EmailIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://github.com/zilpay/zil-pay"
              target="_blank" rel="noreferrer"
            >
              <GitHubIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://medium.com/@lich666black"
              target="_blank" rel="noreferrer"
            >
              <MediumIcon
                color="var(--text-color)"
                height="30"
                width="30"
              />
            </a>
          </div>
        </div>
        <div className="legal">
          <h3>
            {t(`legal`)}
          </h3>
          <Link href="/terms">
            <p>
              {t(`terms`)}
            </p>
          </Link>
          <Link href="/policy">
            <p>
              {t(`privacy`)}
            </p>
          </Link>
          <Link href="/extension-policy">
            <p>
              {t(`extension-policy`)}
            </p>
          </Link>
          <Link href="/dex-policy">
            <p>
              {t(`dex-policy`)}
            </p>
          </Link>
          <a
            href="https://zilpay.github.io/zilpay-docs/"
            target="_blanck"
          >
            <p>
              Documentation
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};
