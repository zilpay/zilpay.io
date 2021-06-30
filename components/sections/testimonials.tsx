import React from 'react';
import { useTranslation } from 'next-i18next';

import { Text } from 'components/text';
import { TestimonialsCard } from 'components/testimonials-card';

import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

import { Container, HeaderWrapper, Wrapper } from './styles';

export const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation(`main`);
  return (
    <Container>
      <HeaderWrapper>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="40px"
        >
          {t(`testimonials_title`)}
        </Text>
      </HeaderWrapper>
      <Wrapper>
        <TestimonialsCard
          img="https://zilpay.io/wp-content/uploads/2021/03/hanwen.png"
          title={t(`testimonials_title0`)}
          info={t(`testimonials_sub_title0`)}
        >
          {t(`testimonials_info0`)}
        </TestimonialsCard>
        <TestimonialsCard
          img="https://zilpay.io/wp-content/uploads/2021/03/amrit.png"
          title={t(`testimonials_title1`)}
          info={t(`testimonials_sub_title1`)}
        >
          {t(`testimonials_info1`)}
        </TestimonialsCard>
      </Wrapper>
    </Container>
  );
};
