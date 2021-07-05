import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Colors } from '@/config/colors';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

import { Button } from 'components/button';

import { IPFS } from 'config/ipfs';

type ContainerProp = {
  url: string;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  margin: 16px;

  height: 200px;
  max-width: 900px;
  width: 100%;

  background-color: ${Colors.Dark};
  background-image: url(${(p: ContainerProp) => p.url});
  background-position: center center;
  background-size: cover;

  @media (max-width: 400px) {
    width: 250px;
  }
`;

type Prop = {
  onRemove: () => void;
  hash: string;
};

export const BannerImage: React.FC<Prop> = ({ hash, onRemove }) => {
  const { t } = useTranslation(`explorer`);

  return (
    <Container url={`${IPFS}/${hash}`}>
      <Button
        onClick={onRemove}
        fontColors={Colors.Danger}
        color={Colors.Danger}
        size="20px"
      >
        {t('remove_item')}
      </Button>
    </Container>
  )
};
