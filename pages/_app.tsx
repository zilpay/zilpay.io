import '../styles/globals.scss';

import React from 'react';
import Cookies from 'cookies';
import { appWithTranslation } from 'next-i18next'
import NextNprogress from "nextjs-progressbar";

import { Footer } from '@/components/footer';
import { NavBar } from '@/components/nav-bar/index';
import { Themes } from '@/config/themes';
import { $settings, updateSettingsStore, updateFromStorage } from '@/store/settings';
import { initZilPayWeb3 } from '@zilpay/zilpay-web3';

updateFromStorage();

const App = ({ Component, pageProps }: any) => {
  React.useEffect(() => {
    if (globalThis.document) {
      initZilPayWeb3();
    }
  }, []);

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

App.getInitialProps = async function({ ctx }: any): Promise<{}> {
  const cookies = new Cookies(ctx.req, ctx.res);
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
