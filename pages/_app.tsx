import { AppProps } from 'next/app';
import { BaseStyles } from '@/styles';
import React from 'react';

import { Footer } from 'components/footer';
import { Navbar } from 'components/nav-bar';
import { MobileNavBar } from 'components/mobile-nav-bar';

import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { MobileView, BrowserView } from 'react-device-detect';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <BaseStyles />
      <BrowserView>
        <Navbar />
      </BrowserView>
      <MobileView>
        <MobileNavBar />
      </MobileView>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
