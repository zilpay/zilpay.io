import React from 'react';
import { useTranslation } from 'next-i18next';

import { Text } from 'components/text';
import { TeamCard } from 'components/team-card';

import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

import { Container, HeaderWrapper, Wrapper } from './styles';

export const TeamSection: React.FC = () => {
  const { t } = useTranslation('main');
  return (
    <Container id="team">
      <HeaderWrapper>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="40px"
        >
          Our Team
        </Text>
      </HeaderWrapper>
      <Wrapper>
        <TeamCard
          img="https://zilpay.io/wp-content/uploads/elementor/thumbs/rinat-1-p4k9dijz3ud1hzqs00vodh57ndfvnvyrsrwflmrh74.png"
          title={t('rinat_name')}
          github="https://github.com/hicaru"
          linkedin="https://www.linkedin.com/in/arc-warden/"
          twitter="https://twitter.com/lich666black"
        >
          {t('rinat_type')}
        </TeamCard>
        <TeamCard
          img="https://zilpay.io/wp-content/uploads/elementor/thumbs/hanwen-p4k9504l7upkd43vpcfasmgxzre7yk69yn855fdtjk.png"
          title={t('han_name')}
          linkedin="https://www.linkedin.com/in/han-wen-chua/"
          twitter="https://twitter.com/chanwen_"
        >
          {t('han_type')}
        </TeamCard>
        <TeamCard
          img="https://zilpay.io/wp-content/uploads/elementor/thumbs/madhav-p4k9453wybj3pzcxqh0m0caqe1n3wjr4udp4bant8w.png"
          title={t('madhav_name')}
          linkedin="https://www.linkedin.com/in/madhavk1698/"
          twitter="https://twitter.com/madhavk1698"
        >
          {t('madhav_type')}
        </TeamCard>
      </Wrapper>
    </Container>
  );
};
