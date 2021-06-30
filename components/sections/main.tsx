import React from 'react';
import styled from 'styled-components';
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

// https://microsoftedge.microsoft.com/addons/detail/zilpay/fbekallmnjoeggkefjkbebpineneilec

// https://addons.mozilla.org/en-GB/firefox/addon/zilpay/
const InstallButton: React.FC = () => {
  if (isChrome) {
    return (
      <GetButton
        color={Colors.Secondary}
        fontColors={Colors.Secondary}
      >
        GET CHROME EXTENSION.
      </GetButton>
    );
  } else if (isEdge) {
    return (
      <GetButton
        color="#0067b8"
        fontColors="#0067b8"
      >
        GET MICROSOFT EDGE EXTENSION.
      </GetButton>
    );
  } else if (isFirefox) {
    return (
      <GetButton
        color="#CC2993"
        fontColors="#CC2993"
      >
        GET FIREFOX EXTENSION.
      </GetButton>
    );
  } else if (isAndroid) {
    return (
      <GetButton
        color={Colors.Secondary}
        fontColors={Colors.Secondary}
      >
        GET ZILPAY ANDROID.
      </GetButton>
    );
  } else if (isIOS) {
    return (
      <GetButton
        color="#bfe2e8"
        fontColors="#bfe2e8"
      >
        GET ZILPAY IOS.
      </GetButton>
    );
  }

  return (
    <GetButton
      color={Colors.Secondary}
      fontColors={Colors.Secondary}
    >
      GET CHROME EXTENSION.
    </GetButton>
  );
};

export const MainSection: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Text
          fontColors={Colors.Secondary}
          fontVariant={StyleFonts.Medium}
          size="12px"
        >
          THE WALLET OF THE ZILLIQA ECOSYSTEM
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="65px"
          css="line-height: 1.2em;ont-weight: 900;"
        >
          ZilPay Wallet
        </Text>
        <Text size="16px">
          A web3 wallet of the ZIlliqa blockchain.
        </Text>
        {process.browser ? (
          <InstallButton />
        ) : null}
      </Wrapper>
    </Container>
  );
};
