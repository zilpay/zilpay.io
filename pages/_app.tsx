import '../styles/globals.scss';

import type { AppProps } from 'next/app'

import React from 'react';
import Cookies from 'cookies';
import { appWithTranslation } from 'next-i18next'
import { GetServerSidePropsContext } from 'next';
import NextNprogress from "nextjs-progressbar";

import { Footer } from '@/components/footer';
import { NavBar } from '@/components/nav-bar/index';
import { Themes } from '@/config/themes';

import { $settings, updateSettingsStore, updateFromStorage } from '@/store/settings';

updateFromStorage();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextNprogress
        color="var(--primary-color)"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow
      />
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

App.getServerSideProps = async function (context: GetServerSidePropsContext): Promise<{}> {
  const cookies = new Cookies(context.req, context.res);
  const theme = cookies.get('theme') || Themes.Dark;

  updateSettingsStore({
    ...$settings.state,
    theme
  });

  return {
    theme
  };
}


export default appWithTranslation(App);
