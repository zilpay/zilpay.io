import React from 'react';
import { useRouter } from 'next/router';

import { Text } from 'components/text';
import { ZoomCard } from 'components/zoom-card';

import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

import { Container, Wrapper, HeaderWrapper } from './styles';

export const AppsSection: React.FC = () => {
  const router = useRouter();

  const hanldeClick = React.useCallback((url: string, native: boolean) => {
    if (native) {
      router.push(url);
    }

    if (!native && process.browser) {
      window.open(url, '_blank');
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
          dApps
        </Text>
        <Text
          fontVariant={StyleFonts.Medium}
          fontColors={Colors.Secondary}
          size="12px"
        >
          EXPLORE DAPPS USING ZILPAY
        </Text>
      </HeaderWrapper>
      <Wrapper>
        <ZoomCard
          url="https://zilpay.io/wp-content/uploads/2021/03/vlx-konstantinov-02-1-1024x576.png"
          href="https://dragonzil.xyz/"
          title="DragonZIL"
          onClick={(url) => hanldeClick(url, false)}
        >
          Buy and train dragons
        </ZoomCard>
        <ZoomCard
          url="https://zilpay.io/wp-content/uploads/2021/03/kyle-brinker-0vVHYD3PcKo-unsplash_3-1-1024x822.jpg"
          href="https://unstoppabledomains.com/"
          title="UnstoppableDomains"
          onClick={(url) => hanldeClick(url, false)}
        >
          buy and manage domains
        </ZoomCard>
        <ZoomCard
          url="https://zilpay.io/wp-content/uploads/2021/03/fingerprint-1024x683.png"
          href="https://zilpay-b255e.web.app/Verification"
          title="Signature Verification"
          onClick={(url) => hanldeClick(url, false)}
        >
          Verify transactions signatures
        </ZoomCard>
        <ZoomCard
          url="https://zilpay.io/wp-content/uploads/2021/03/UD-laptop-1024x683.png"
          href="https://stake.zilliqa.com/"
          title="Stake"
          onClick={(url) => hanldeClick(url, false)}
        >
          Delegate validators
        </ZoomCard>
        <ZoomCard
          url="https://zilpay.io/wp-content/uploads/2021/03/data-1024x682.png"
          href="https://ide.zilliqa.com/#/"
          title="Scilla Editor"
          onClick={(url) => hanldeClick(url, false)}
        >
          Edit and deploy a smart contract on scilla language
        </ZoomCard>
        <ZoomCard
          url="https://zilpay.io/wp-content/uploads/2021/03/graph-1024x682.png"
          href="https://zilswap.io/swap"
          title="Zilswap"
          onClick={(url) => hanldeClick(url, false)}
        >
          Swap or provide liquidity to ZRC2 tokens
        </ZoomCard>
      </Wrapper>
    </Container>
  );
};
