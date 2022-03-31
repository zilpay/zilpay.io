import "@/styles/components/_apps.scss";

import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { ZoomCard } from 'components/zoom-card';


export const AppsSection: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation(`main`);

  const hanldeClick = React.useCallback((url: string, native: boolean) => {
    if (native) {
      router.push(url);
    }

    if (!native && process.browser) {
      window.open(url, `_blank`);
    }
  }, [router]);

  return (
    <div className="apps">
      <div className="header-wrapper">
        <h2>
          {t(`apps_title`)}
        </h2>
        <p>
          {t(`apps_sub_title`)}
        </p>
      </div>
      <div className="wrapper">
        <ZoomCard
          url="/images/vlx-konstantinov-02-1-1024x576.webp"
          href="https://dragonzil.xyz/"
          title="DragonZIL"
          onClick={(url) => hanldeClick(url, false)}
        >
          {t(`app0`)}
        </ZoomCard>
        <ZoomCard
          url="/images/kyle-brinker-0vVHYD3PcKo-unsplash_3-1-1024x822.webp"
          href="https://unstoppabledomains.com/"
          title="UnstoppableDomains"
          onClick={(url) => hanldeClick(url, false)}
        >
          {t(`app1`)}
        </ZoomCard>
        <ZoomCard
          url="/images/fingerprint-1024x683.webp"
          href="https://zilpay-b255e.web.app/Verification#/Verification"
          title="Signature Verification"
          onClick={(url) => hanldeClick(url, false)}
        >
          {t(`app2`)}
        </ZoomCard>
        <ZoomCard
          url="/images/UD-laptop-1024x683.webp"
          href="https://stake.zilliqa.com/"
          title="Stake"
          onClick={(url) => hanldeClick(url, false)}
        >
          {t(`app3`)}
        </ZoomCard>
        <ZoomCard
          url="/images/data-1024x682.webp"
          href="https://ide.zilliqa.com/#/"
          title="Scilla Editor"
          onClick={(url) => hanldeClick(url, false)}
        >
          {t(`app4`)}
        </ZoomCard>
        <ZoomCard
          url="/images/graph-1024x682.webp"
          href="https://zilswap.io/swap"
          title="ZilSwap"
          onClick={(url) => hanldeClick(url, false)}
        >
          {t(`app5`)}
        </ZoomCard>
      </div>
    </div>
  );
};

export default AppsSection;
