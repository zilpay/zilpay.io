import React from 'react';

import { Text } from 'components/text';
import { TeamCard } from 'components/team-card';

import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

import { Container, HeaderWrapper, Wrapper } from './styles';

export const TeamSection: React.FC = () => {
  return (
    <Container>
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
          title="Rinat Hasanshin"
          github="https://github.com/hicaru"
          linkedin="https://www.linkedin.com/in/arc-warden/"
          twitter="https://twitter.com/lich666black"
        >
          CO-FOUNDER & CEO
        </TeamCard>
        <TeamCard
          img="https://zilpay.io/wp-content/uploads/elementor/thumbs/hanwen-p4k9504l7upkd43vpcfasmgxzre7yk69yn855fdtjk.png"
          title="Han Wen Chua"
          linkedin="https://www.linkedin.com/in/han-wen-chua/"
          twitter="https://twitter.com/chanwen_"
        >
          STRATEGIC ADVISOR
        </TeamCard>
        <TeamCard
          img="https://zilpay.io/wp-content/uploads/elementor/thumbs/madhav-p4k9453wybj3pzcxqh0m0caqe1n3wjr4udp4bant8w.png"
          title="Madhav Khandelwal"
          linkedin="https://www.linkedin.com/in/madhavk1698/"
          twitter="https://twitter.com/madhavk1698"
        >
          CREATIVE ADVISOR
        </TeamCard>
      </Wrapper>
    </Container>
  );
};
