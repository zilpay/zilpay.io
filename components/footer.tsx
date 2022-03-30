import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { Text } from 'components/text';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const AppleIcon = dynamic(import(`components/icons/apple`));
const GoogleIcon = dynamic(import(`components/icons/google`));
const FireFoxIcon = dynamic(import(`components/icons/firefox`));
const ChromeIcon = dynamic(import(`components/icons/chrome`));
const TelegramIcon = dynamic(import(`components/icons/telegram`));
const TwitterIcon = dynamic(import(`components/icons/twitter`));
const EmailIcon = dynamic(import(`components/icons/email`));
const GitHubIcon = dynamic(import(`components/icons/github`));
const MediumIcon = dynamic(import(`components/icons/medium`));

const Container = styled.div`
  background-color: ${Colors.Background};
  transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
  padding: 90px 0px 90px 0px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  padding-left: 30px;
  padding-right: 30px;
`;
const Office = styled.div`
  width: 180px;
`;
const Involved = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InvolvedWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  a {
    margin: 10px;
  }
`;
const Legal = styled.div`
  width: 180px;
`;

export const Footer: React.FC = () => {
  const { t } = useTranslation(`common`);
  return (
    <Container id="contact">
      <Wrapper>
        <Office>
          <Text
            fontColors={Colors.Text}
            fontVariant={StyleFonts.Bold}
            size="18px"
          >
            {t(`office`)}
          </Text>
          <Text
            fontVariant={StyleFonts.Light}
            size="14px"
          >
            {t(`office_value`)}
          </Text>
        </Office>
        <Involved>
          <Text
            fontColors={Colors.Text}
            fontVariant={StyleFonts.Bold}
            size="18px"
          >
            {t(`footer_icons`)}
          </Text>
          <InvolvedWrapper>
            <a
              href="https://apps.apple.com/ru/app/zilpay/id1547105860"
              target="_blank" rel="noreferrer"
            >
              <AppleIcon
                color={Colors.Text}
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.zilpaymobile"
              target="_blank" rel="noreferrer"
            >
              <GoogleIcon
                color={Colors.Text}
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://addons.mozilla.org/en-GB/firefox/addon/zilpay/"
              target="_blank" rel="noreferrer"
            >
              <FireFoxIcon
                color={Colors.Text}
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://chrome.google.com/webstore/detail/zilpay/klnaejjgbibmhlephnhpmaofohgkpgkd"
              target="_blank" rel="noreferrer"
            >
              <ChromeIcon
                color={Colors.Text}
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://t.me/zilpaychat"
              target="_blank" rel="noreferrer"
            >
              <TelegramIcon
                color={Colors.Text}
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://twitter.com/pay_zil"
              target="_blank" rel="noreferrer"
            >
              <TwitterIcon
                color={Colors.Text}
                height="30"
                width="30"
              />
            </a>
            <a
              href="mailto:contact@zilpay.io"
              target="_blank" rel="noreferrer"
            >
              <EmailIcon
                color={Colors.Text}
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://github.com/zilpay/zil-pay"
              target="_blank" rel="noreferrer"
            >
              <GitHubIcon
                color={Colors.Text}
                height="30"
                width="30"
              />
            </a>
            <a
              href="https://medium.com/@lich666black"
              target="_blank" rel="noreferrer"
            >
              <MediumIcon
                color={Colors.Text}
                height="30"
                width="30"
              />
            </a>
          </InvolvedWrapper>
        </Involved>
        <Legal>
          <Text
            fontColors={Colors.Text}
            fontVariant={StyleFonts.Bold}
            size="18px"
          >
            {t(`legal`)}
          </Text>
          <Link href="/terms">
            <Text
              fontVariant={StyleFonts.Light}
              size="14px"
              pointer
            >
              {t(`terms`)}
            </Text>
          </Link>
          <Link href="/policy">
            <Text
              fontVariant={StyleFonts.Light}
              size="14px"
              pointer
            >
              {t(`privacy`)}
            </Text>
          </Link>
          <Link href="/extension-policy">
            <Text
              fontVariant={StyleFonts.Light}
              size="14px"
              pointer
            >
              {t(`extension-policy`)}
            </Text>
          </Link>
          <Link href="/dex-policy">
            <Text
              fontVariant={StyleFonts.Light}
              size="14px"
              pointer
            >
              {t(`dex-policy`)}
            </Text>
          </Link>
          <a
            href="https://zilpay.github.io/zilpay-docs/"
            target="_blanck"
          >
            <Text
              fontVariant={StyleFonts.Light}
              size="14px"
              pointer
            >
              Documentation
            </Text>
          </a>
        </Legal>
      </Wrapper>
    </Container>
  );
};
