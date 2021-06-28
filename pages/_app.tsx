import { AppProps } from 'next/app';
import { BaseStyles } from '@/styles';
import React from 'react';


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <BaseStyles />
      <Component {...pageProps} />
    </>
  );
}
