import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next'
import { BaseStyles } from '@/styles';
import React from 'react';

import { Footer } from 'components/footer';
import { Navbar } from 'components/nav-bar';
import { MobileNavBar } from 'components/mobile-nav-bar';

import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { isMobile, isDesktop, isAndroid, isIOS } from 'react-device-detect';

const App = ({ Component, pageProps }: AppProps) => {
  return (
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
  );
}

export default appWithTranslation(App);
