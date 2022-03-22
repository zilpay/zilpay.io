import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next'
import React from 'react';
import NextNprogress from "nextjs-progressbar";

import { Footer } from 'components/footer';
import { Navbar } from 'components/nav-bar';
import { MobileNavBar } from 'components/mobile-nav-bar';

import { isMobile, isDesktop, isAndroid, isIOS } from 'react-device-detect';
import { BaseStyles } from '@/styles';
import { Colors } from '@/config/colors';

const App = ({ Component, pageProps }: AppProps) => (
    <>
      <BaseStyles />
      <NextNprogress
        color={Colors.Primary}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow
      />
      {isDesktop && !isAndroid && !isIOS ? (
        <Navbar />
      ) : null}
      {isMobile || isAndroid || isIOS ? (
        <MobileNavBar />
      ) : null}
      <Component {...pageProps} />
      <Footer />
    </>
  )

export default appWithTranslation(App);
