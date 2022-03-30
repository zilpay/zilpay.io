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

import { Colors } from '@/config/colors';

const GetButton = styled.button`
  padding: 20px 30px;

  color: ${Colors.Button};
  background: ${Colors.Primary};

  :hover {
    color: ${Colors.Primary};
    background: ${Colors.Button};
  }
`;

export const InstallButton: React.FC = () => {
  const { t } = useTranslation(`main`);

 if (isAndroid) {
    return (
      <a href="https://play.google.com/store/apps/details?id=com.zilpaymobile">
        <GetButton>
          {t(`get_android`)}
        </GetButton>
      </a>
    );
  } if (isIOS) {
    return (
      <a href="https://apps.apple.com/ru/app/zilpay/id1547105860">
        <GetButton>
          {t(`get_ios`)}
        </GetButton>
      </a>
    );
  } if (isChrome) {
    return (
      <a href="https://chrome.google.com/webstore/detail/zilpay/klnaejjgbibmhlephnhpmaofohgkpgkd">
        <GetButton>
          {t(`get_chrome`)}
        </GetButton>
      </a>
    );
  } if (isEdge) {
    return (
      <a href="https://microsoftedge.microsoft.com/addons/detail/zilpay/fbekallmnjoeggkefjkbebpineneilec">
        <GetButton>
          {t(`get_edge`)}
        </GetButton>
      </a>
    );
  } if (isFirefox) {
    return (
      <a href="https://addons.mozilla.org/en-GB/firefox/addon/zilpay/">
        <GetButton>
          {t(`get_firefox`)}
        </GetButton>
      </a>
    );
  }

  return null;
};

export default InstallButton;
