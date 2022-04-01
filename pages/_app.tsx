import '../styles/globals.scss'

import type { AppProps } from 'next/app'

import { appWithTranslation } from 'next-i18next'
import NextNprogress from "nextjs-progressbar"
import { Footer } from '@/components/footer';
import { NavBar } from '@/components/nav-bar';

const App = ({ Component, pageProps }: AppProps) => (
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

export default appWithTranslation(App);
