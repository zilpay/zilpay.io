import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import {
  isChrome,
  isEdge,
  isFirefox,
  isAndroid,
  isIOS
} from 'react-device-detect';

import { Text } from 'components/text';
import { Button } from 'components/button';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.section`
  display: flex;
  align-items: center;

  height: 90vh;
  width: 100%;

  background-image: url(https://zilpay.io/wp-content/uploads/2021/03/bg.png);
  background-position: center center;
  background-size: cover;

  @media (max-width: 900px) {
    background-image: url(https://zilpay.io/wp-content/uploads/2021/03/mob2.png);
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding-left: 10vw;
  padding-right: 10vw;

  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
  }
`;
const GetButton = styled(Button)`
  padding: 20px 30px;
`;

const InstallButton: React.FC = () => {
  const { t } = useTranslation('main');

  if (isChrome) {
    return (
      <a href="https://chrome.google.com/webstore/detail/zilpay/klnaejjgbibmhlephnhpmaofohgkpgkd">
        <GetButton
          color={Colors.Secondary}
          fontColors={Colors.Secondary}
        >
          {t('get_chrome')}
        </GetButton>
      </a>
    );
  } else if (isEdge) {
    return (
      <a href="https://microsoftedge.microsoft.com/addons/detail/zilpay/fbekallmnjoeggkefjkbebpineneilec">
        <GetButton
          color="#0067b8"
          fontColors="#0067b8"
        >
          {t('get_edge')}
        </GetButton>
      </a>
    );
  } else if (isFirefox) {
    return (
      <a href="https://addons.mozilla.org/en-GB/firefox/addon/zilpay/">
        <GetButton
          color="#CC2993"
          fontColors="#CC2993"
        >
          {t('get_firefox')}
        </GetButton>
      </a>
    );
  } else if (isAndroid) {
    return (
      <a href="https://play.google.com/store/apps/details?id=com.zilpaymobile">
        <GetButton
          color={Colors.Secondary}
          fontColors={Colors.Secondary}
        >
          {t('get_android')}
        </GetButton>
      </a>
    );
  } else if (isIOS) {
    return (
      <a href="https://apps.apple.com/ru/app/zilpay/id1547105860">
        <GetButton
          color="#bfe2e8"
          fontColors="#bfe2e8"
        >
          {t('get_ios')}
        </GetButton>
      </a>
    );
  }

  return null;
};

export const MainSection: React.FC = () => {
  const { t } = useTranslation('main');

  return (
    <Container>
      <Wrapper>
        <Text
          fontColors={Colors.Secondary}
          fontVariant={StyleFonts.Medium}
          size="12px"
        >
          {t('sub_title')}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="65px"
          css="line-height: 1.2em;ont-weight: 900;"
        >
          {t('title')}
        </Text>
        <Text size="16px">
          {t('under_title')}
        </Text>
        {process.browser ? (
          <InstallButton />
        ) : null}
      </Wrapper>
    </Container>
  );
};
