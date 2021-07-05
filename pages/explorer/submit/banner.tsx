import React from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Dropzone } from 'components/dropzone';
import { Text } from 'components/text';
import { BannerImage } from 'components/banner-image';

import { useZilPay } from 'mixins/zilpay';
import { Explorer, AnApp } from 'mixins/explorer';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { IPFS } from 'config/ipfs';
import { StorageFields } from 'config/storage-fields';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  margin-bottom: 100px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const SubmitBannerPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation(`explorer`);
  const zilpay = useZilPay();
  const [hash, setHash] = React.useState('');

  const hanldeUploaded = React.useCallback((hash: string) => {
    window.localStorage.setItem(StorageFields.Bannerhash, hash);
    setHash(hash);
  }, []);
  const hanldeRemoveImage = React.useCallback(() => {
    window.localStorage.removeItem(StorageFields.Bannerhash);
    setHash('');
  }, []);

  React.useEffect(() => {
    const ipfsHash = window.localStorage.getItem(StorageFields.Bannerhash);

    if (ipfsHash) {
      setHash(String(ipfsHash));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Banner - ZilPay</title>
        <meta
          property="og:title"
          content={`Banner - ZilPay`}
          key="title"
        />
      </Head>
      <Container>
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.White}
          size="25px"
          css="text-indent: 30px;"
        >
          Upload banner.
        </Text>
        <Wrapper>
          {hash ? (
            <BannerImage
              hash={hash}
              onRemove={hanldeRemoveImage}
            />
          ) : (
            <Dropzone onUploaded={hanldeUploaded}/>
          )}
        </Wrapper>
      </Container>
    </>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`explorer`, `common`]),
  },
});

export default SubmitBannerPage;
