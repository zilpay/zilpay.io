import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import styled from 'styled-components';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Container, FormWrapper } from './banner';
import { PreviewImg } from 'components/preview-img';
import { Input } from 'components/input';
import { Text } from 'components/text';

import { useZilPay } from 'mixins/zilpay';

import { sliderProps } from 'config/slider';
import { IPFS, INFURA } from 'config/ipfs';
import { StorageFields } from '@/config/storage-fields';
import { Button } from '@/components/button';

const Dropzone = dynamic(import(`components/dropzone`));
const BannerImage = dynamic(import(`components/banner-image`));
const Slider = dynamic(import(`react-slick`));
const IPFSnano = import(`nano-ipfs-store`);

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 30px;

  div > .slick-slider {
    width: 90vw;
    max-width: initial;
  }
`;
const WrapperDropZOne = styled.line`
  margin: 20px;

  div {
    height: auto;
    width: auto;
  }
`;
export const SubmitAppPage: NextPage = () => {
  const { t } = useTranslation(`explorer`);
  const zilpay = useZilPay();

  const [hashs, setHashs] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [descriptionHash, setDescriptionHash] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [iconHash, setIconHash] = React.useState('');

  const hanldeUploadedBanner = React.useCallback((ipfsHash: string) => {
    const hashList = hashs;

    hashList.push(ipfsHash);
    window.localStorage.setItem(StorageFields.AppHashSet, JSON.stringify(hashs));

    setHashs(hashList);
  }, []);
  const hanldeUploadedIcon = React.useCallback((ipfsHash: string) => {
    window.localStorage.setItem(StorageFields.AppIconHash, ipfsHash);
    setIconHash(ipfsHash);
  }, []);

  const hanldeUploadDescription = React.useCallback(async() => {
    const ipfs = (await IPFSnano).at(INFURA);
    const doc = JSON.stringify({
      text: description
    });
    const cid = await ipfs.add(doc);

    setDescriptionHash(cid);

    window.localStorage.setItem(StorageFields.AppDescriptionHash, cid);
  }, [description]);

  const handleChangeTitle = React.useCallback((content: string) => {
    window.localStorage.setItem(StorageFields.AppTitle, content);
    setTitle(content);
  }, []);
  const handleChangeDescription = React.useCallback((content: string) => {
    window.localStorage.setItem(StorageFields.AppDescription, content);
    setDescription(content);
  }, []);
  const handleChangeUrl = React.useCallback((content: string) => {
    window.localStorage.setItem(StorageFields.AppUrl, content);
    setUrl(content);
  }, []);

  React.useEffect(() => {
    const hashList = window.localStorage.getItem(StorageFields.AppHashSet);

    if (hashList) {
      setHashs(JSON.parse(hashList));
    }

    const appDescriptino = window.localStorage.getItem(StorageFields.AppDescription);

    if (appDescriptino) {
      setDescription(appDescriptino);
    }

    const appTitle = window.localStorage.getItem(StorageFields.AppTitle);

    if (appTitle) {
      setTitle(appTitle);
    }

    const iconHash = window.localStorage.getItem(StorageFields.AppIconHash);
    
    if (iconHash) {
      setIconHash(iconHash);
    }

    const appUrl = window.localStorage.getItem(StorageFields.AppUrl);
    
    if (appUrl) {
      setUrl(appUrl);
    }
  }, []);

  return (
    <>
      <Head>
        <title>App - ZilPay</title>
        <meta
          property="og:title"
          content="App - ZilPay"
          key="title"
        />
      </Head>
      <Container>
        <Wrapper>
          <div>
            <Slider {...sliderProps}>
              {hashs.map((image) => (
                <PreviewImg
                  key={image}
                  src={`${IPFS}/${image}`}
                  alt="preview"
                />
              ))}
            </Slider>
          </div>
          {hashs.length < 4 ? (
            <Dropzone onUploaded={hanldeUploadedBanner}/>
          ) : null}
          {!iconHash ? (
            <WrapperDropZOne>
              <Dropzone
                title="Drop an icon"
                onUploaded={hanldeUploadedIcon}
              />
            </WrapperDropZOne>
          ) : (
            <div style={{ margin: '33px' }}>
              <BannerImage
                hash={iconHash}
                onRemove={() => hanldeUploadedIcon('')}
              />
            </div>
          )}
          <FormWrapper>
            <label style={{ width: `80%` }}>
              <Text>
                Title
              </Text>
              <Input
                value={title}
                disabled={loading}
                maxLength={30}
                placeholder={'DragonZIL'}
                type="text"
                css="width: 100%;"
                onChange={(e) => handleChangeTitle(e.target.value)}
              />
            </label>
            <label style={{ width: `80%` }}>
              <Text>
                Description
              </Text>
              <Input
                value={description}
                disabled={loading}
                maxLength={200}
                placeholder={'The best game of zilliqa'}
                type="text"
                css="width: 100%;"
                onChange={(e) => handleChangeDescription(e.target.value)}
              />
            </label>
            <label style={{ width: `80%` }}>
              <Text>
                URL
              </Text>
              <Input
                value={url}
                disabled={loading}
                type="text"
                placeholder={'https://dragonzil.xyz/'}
                css="width: 100%;"
                onChange={(e) => handleChangeUrl(e.target.value)}
              />
            </label>
            <Button onClick={hanldeUploadDescription}>
              upload
            </Button>
          </FormWrapper>
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

export default SubmitAppPage;
