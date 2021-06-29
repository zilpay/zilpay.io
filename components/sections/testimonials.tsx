import React from 'react';

import { Text } from 'components/text';
import { TestimonialsCard } from 'components/testimonials-card';

import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

import { Container, HeaderWrapper, Wrapper } from './styles';

export const TestimonialsSection: React.FC = () => {
  return (
    <Container>
      <HeaderWrapper>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="40px"
        >
          Testimonials
        </Text>
      </HeaderWrapper>
      <Wrapper>
        <TestimonialsCard
          img="https://zilpay.io/wp-content/uploads/2021/03/hanwen.png"
          title="Han Wen Chua"
          info="Sr. VP Ecosystem Growth, Zilliqa"
        >
          ZilPay is a secure and easy-to-use bridge between the web2 and web3 world. If you wish to navigate the web3 ecosystem of the Zilliqa blockchain, ZilPay is your best friend!
        </TestimonialsCard>
        <TestimonialsCard
          img="https://zilpay.io/wp-content/uploads/2021/03/amrit.png"
          title="Amrit Kumar"
          info="President & CSO at Zilliqa"
        >
          I have used ZilPay wallet to interact with several dApps on the Zilliqa chain. A great feature that ZilPay has is the ability to import any external account generated through any other wallet, also, it is the only wallet today that allows resetting the nonce in case it is needed. I am an avid user of ZilPay and I love it.
        </TestimonialsCard>
      </Wrapper>
    </Container>
  );
};
