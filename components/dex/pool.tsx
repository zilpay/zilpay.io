import type { TokenState } from '@/types/token';

import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Big from 'big.js';

import { Text } from 'components/text';
import { FormInput } from './input';

import { StyleFonts } from '@/config/fonts';

import { DragonDex, SwapDirection } from '@/mixins/dex';
import { ZilPayBase } from 'mixins/zilpay-base';


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;
const ContainerForm = styled.form`
  background-color: #18191D;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 32px;
  padding-top: 20px;
  padding-left: 26px;
  padding-right: 26px;
`;

export const PoolForm: React.FC = () => {

  return (
    <ContainerForm />
  );
};
