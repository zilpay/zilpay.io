import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

import { Text } from 'components/text';
import { InstallButton } from 'components/Install-button';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.section`
  display: flex;
  align-items: center;

  height: 90vh;
  width: 100%;
`;
export const Background = styled.div`
  position: absolute;

  height: 195vh;
  width: 100%;
  z-index: -1;

  background-image: url(/images/bg.webp);
  background-position: center center;
  background-size: cover;

  @media (max-width: 900px) {
    background-image: url(/images/mob2.webp);
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding-left: 10vw;
  padding-right: 10vw;

  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
  }
`;

export const MainSection: React.FC = () => {
  const { t } = useTranslation(`main`);

  return (
    <Container>
      <Background />
      <Wrapper>
        <Text
          fontColors={Colors.Secondary}
          fontVariant={StyleFonts.Medium}
          size="12px"
        >
          {t(`sub_title`)}
        </Text>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.Primary}
          size="65px"
          css="line-height: 1.2em;ont-weight: 900;"
        >
          {t(`title`)}
        </Text>
        <Text size="16px">
          {t(`under_title`)}
        </Text>
        <InstallButton />
      </Wrapper>
    </Container>
  );
};

export default MainSection;
