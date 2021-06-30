import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Text } from 'components/text';
import { ZoomCard } from 'components/zoom-card';

import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

import { Container, Wrapper, HeaderWrapper } from './styles';

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
    <Container>
      <HeaderWrapper>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="40px"
        >
          {t(`apps_title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Medium}
          fontColors={Colors.Secondary}
          size="12px"
        >
          {t(`apps_sub_title`)}
        </Text>
      </HeaderWrapper>
      <Wrapper>
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
          title="Zilswap"
          onClick={(url) => hanldeClick(url, false)}
        >
          {t(`app5`)}
        </ZoomCard>
      </Wrapper>
    </Container>
  );
};
