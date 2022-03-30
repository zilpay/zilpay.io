import React from 'react';
import { useTranslation } from 'next-i18next';

import { Text } from 'components/text';
import { TeamCard } from 'components/team-card';

import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

import { Container, HeaderWrapper, Wrapper } from './styles';

export const TeamSection: React.FC = () => {
  const { t } = useTranslation(`main`);
  return (
    <Container id="team">
      <HeaderWrapper>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.Primary}
          size="40px"
        >
          Our Team
        </Text>
      </HeaderWrapper>
      <Wrapper>
        <TeamCard
          img="/images/rinat.webp"
          title={t(`rinat_name`)}
          github="https://github.com/hicaru"
          linkedin="https://www.linkedin.com/in/arc-warden/"
          twitter="https://twitter.com/lich666black"
        >
          {t(`rinat_type`)}
        </TeamCard>
        <TeamCard
          img="/images/hanwen.webp"
          title={t(`han_name`)}
          linkedin="https://www.linkedin.com/in/han-wen-chua/"
          twitter="https://twitter.com/chanwen_"
        >
          {t(`han_type`)}
        </TeamCard>
        <TeamCard
          img="/images/madhav.webp"
          title={t(`madhav_name`)}
          linkedin="https://www.linkedin.com/in/madhavk1698/"
          twitter="https://twitter.com/madhavk1698"
        >
          {t(`madhav_type`)}
        </TeamCard>
      </Wrapper>
    </Container>
  );
};

export default TeamSection;
