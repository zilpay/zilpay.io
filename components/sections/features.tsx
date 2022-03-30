import React from 'react';
import { useTranslation } from 'next-i18next';

import { Card } from 'components/card';
import { Text } from 'components/text';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

import { Container, Wrapper, HeaderWrapper } from './styles';

export const FeaturesSection: React.FC = () => {
  const { t } = useTranslation(`main`);
  return (
    <Container id="services">
      <HeaderWrapper>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.Primary}
          size="40px"
        >
          {t(`features_title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Medium}
          fontColors={Colors.Secondary}
          size="12px"
        >
          {t(`features_sub_title`)}
        </Text>
      </HeaderWrapper>
      <Wrapper>
        <Card
          url="/icons/wallet.svg"
          title={t(`features_title_card0`)}
        >
          {t(`features_sub_title_card0`)}
        </Card>
        <Card
          url="/icons/location.svg"
          title={t(`features_title_card1`)}
        >
          {t(`features_sub_title_card1`)}
        </Card>
        <Card
          url="/icons/key.svg"
          title={t(`features_title_card2`)}
        >
          {t(`features_sub_title_card2`)}
        </Card>
        <Card
          url="/icons/lock.svg"
          title={t(`features_title_card3`)}
        >
          {t(`features_sub_title_card3`)}
        </Card>
        <Card
          url="/icons/settings.svg"
          title={t(`features_title_card4`)}
        >
          {t(`features_sub_title_card4`)}
        </Card>
        <Card
          url="/icons/rokket.svg"
          title={t(`features_title_card5`)}
        >
          {t(`features_sub_title_card5`)}
        </Card>
      </Wrapper>
    </Container>
  );
};

export default FeaturesSection;
