import "@/styles/base";
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next'
import React from 'react';
import NextNprogress from "nextjs-progressbar";

import { Footer } from 'components/footer';
import { Navbar } from 'components/nav-bar';

import { isDesktop, isAndroid, isIOS } from 'react-device-detect';
import { Colors } from '@/config/colors';

const App = ({ Component, pageProps }: AppProps) => (
    <>
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
      <Component {...pageProps} />
      <Footer />
    </>
  )

export default appWithTranslation(App);
