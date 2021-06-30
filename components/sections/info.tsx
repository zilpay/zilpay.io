import React from 'react';
import { useTranslation } from 'next-i18next';

import { Card } from 'components/card';

import { Container, Wrapper } from './styles';

export const InfoSection: React.FC = () => {
  const { t } = useTranslation('main');
  return (
    <Container>
      <Wrapper>
        <Card
          url="/icons/info-0.svg"
          title={t('section_title_card0')}
        >
          {t('section_info_card0')}
        </Card>
        <Card
          url="/icons/info-1.svg"
          title={t('section_title_card1')}
          selected
        >
          {t('section_info_card1')}
        </Card>
        <Card
          url="/icons/info-2.svg"
          title={t('section_title_card2')}
        >
          {t('section_info_card2')}
        </Card>
      </Wrapper>
    </Container>
  );
};
