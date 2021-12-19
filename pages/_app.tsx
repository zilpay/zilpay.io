import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next'
import React from 'react';

import { Footer } from 'components/footer';
import { Navbar } from 'components/nav-bar';
import { MobileNavBar } from 'components/mobile-nav-bar';

import { isMobile, isDesktop, isAndroid, isIOS } from 'react-device-detect';
import { BaseStyles } from '@/styles';

const App = ({ Component, pageProps }: AppProps) => (
    <>
      <BaseStyles />
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
