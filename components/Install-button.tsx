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

import { Button } from 'components/button';

import { Colors } from '@/config/colors';

const GetButton = styled(Button)`
  padding: 20px 30px;
`;

export const InstallButton: React.FC = () => {
  const { t } = useTranslation(`main`);

  if (isChrome) {
    return (
      <a href="https://chrome.google.com/webstore/detail/zilpay/klnaejjgbibmhlephnhpmaofohgkpgkd">
        <GetButton
          color={Colors.Secondary}
          fontColors={Colors.Secondary}
        >
          {t(`get_chrome`)}
        </GetButton>
      </a>
    );
  } if (isEdge) {
    return (
      <a href="https://microsoftedge.microsoft.com/addons/detail/zilpay/fbekallmnjoeggkefjkbebpineneilec">
        <GetButton
          color="#0067b8"
          fontColors="#0067b8"
        >
          {t(`get_edge`)}
        </GetButton>
      </a>
    );
  } if (isFirefox) {
    return (
      <a href="https://addons.mozilla.org/en-GB/firefox/addon/zilpay/">
        <GetButton
          color="#CC2993"
          fontColors="#CC2993"
        >
          {t(`get_firefox`)}
        </GetButton>
      </a>
    );
  } if (isAndroid) {
    return (
      <a href="https://play.google.com/store/apps/details?id=com.zilpaymobile">
        <GetButton
          color={Colors.Secondary}
          fontColors={Colors.Secondary}
        >
          {t(`get_android`)}
        </GetButton>
      </a>
    );
  } if (isIOS) {
    return (
      <a href="https://apps.apple.com/ru/app/zilpay/id1547105860">
        <GetButton
          color="#bfe2e8"
          fontColors="#bfe2e8"
        >
          {t(`get_ios`)}
        </GetButton>
      </a>
    );
  }

  return null;
};

export default InstallButton;
