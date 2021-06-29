import { AppProps } from 'next/app';
import { BaseStyles } from '@/styles';
import React from 'react';

import { Footer } from 'components/footer';

import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <BaseStyles />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
