import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import styled from 'styled-components';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Input } from 'components/input';
import { Text } from 'components/text';
import { DropDown } from 'components/drop-down';
import { Modal } from 'components/modal';

import { useZilPay } from 'mixins/zilpay';

import { sliderProps } from 'config/slider';
import { INFURA } from 'config/ipfs';
import { StorageFields } from '@/config/storage-fields';
import { Button } from '@/components/button';

import { ExplorerBanner } from 'mixins/place-banner';
import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';
import { VIEW_BLOCK } from '@/config/explorer';
import { Container, FormWrapper, ButtonsWrapper } from './banner';

const Dropzone = dynamic(import(`components/dropzone`));
const BannerImage = dynamic(import(`components/banner-image`));
const Slider = dynamic(import(`react-slick`));
const IPFSnano = import(`nano-ipfs-store`);
const Loader = dynamic(import(`react-loader-spinner`));
const InstallButton = dynamic(import(`components/Install-button`));

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 30px;

  div > .slick-slider {
    width: 50vw;
    max-width: initial;
  }

  @media (max-width: 900px) {
    div > .slick-slider {
      width: 90vw;
    }
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

  const [error, setError] = React.useState(``);
  const [modalShow, setModalShow] = React.useState(false);
  const [txId, setTxId] = React.useState(``);
  const [noZilPayModal, setNoZilPayModal] = React.useState(false);
  const [hashs, setHashs] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState(``);
  const [description, setDescription] = React.useState(``);
  const [url, setUrl] = React.useState(``);
  const [iconHash, setIconHash] = React.useState(``);
  const [category, setCategory] = React.useState(0);

  const list = [
    {
      name: t(`category`),
      value: -1
    },
    {
      name: t(`cat_0`),
      value: 0
    },
    {
      name: t(`cat_1`),
      value: 1
    },
    {
      name: t(`cat_2`),
      value: 2
    },
    {
      name: t(`cat_3`),
      value: 3
    },
    {
      name: t(`cat_4`),
      value: 4
    },
    {
      name: t(`cat_5`),
      value: 5
    }
  ];

  const hanldeUploadedBanner = React.useCallback((ipfsHash: string) => {
    const hashList = hashs;

    if (!ipfsHash) {
      return null;
    }

    if (hashs.includes(ipfsHash)) {
      setError('Hash Already existing');

      return null;
    }

    setError(``);
    hashList.push(ipfsHash);
    window.localStorage.setItem(StorageFields.AppHashSet, JSON.stringify(hashs));

    setHashs(hashList);
  }, []);
  const hanldeAddIPFS = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    hanldeUploadedBanner(e.target.value);
    e.target.value = ``;
  }, []);
  const hanldeUploadedIcon = React.useCallback((ipfsHash: string) => {
    setError(``);
    window.localStorage.setItem(StorageFields.AppIconHash, ipfsHash);
    setIconHash(ipfsHash);
  }, []);

  const handleChangeTitle = React.useCallback((content: string) => {
    setError(``);
    window.localStorage.setItem(StorageFields.AppTitle, content);
    setTitle(content);
  }, []);
  const handleChangeDescription = React.useCallback((content: string) => {
    setError(``);
    window.localStorage.setItem(StorageFields.AppDescription, content);
    setDescription(content);
  }, []);
  const handleChangeUrl = React.useCallback((content: string) => {
    setError(``);
    window.localStorage.setItem(StorageFields.AppUrl, content);
    setUrl(content);
  }, []);
  const handleChangeCategory = React.useCallback((content: number) => {
    setError(``);
    window.localStorage.setItem(StorageFields.AppCategory, String(content));
    setCategory(content);
  }, []);
  const handleRemoveImage = React.useCallback((image: string) => {
    const newList = hashs.filter((img) => img !== image);
    window.localStorage.setItem(StorageFields.AppHashSet, JSON.stringify(newList));
    setHashs(newList);
  }, [hashs]);

  const handleSubmit = React.useCallback(async(event) => {
    event.preventDefault();
    if (!zilpay.instance) {
      return null;
    }

    setLoading(true);
    setError(``);

    if (!url) {
      setError(t(`url_error`));
      return null;
    }

    if (hashs.length < 2) {
      setError(t(`not_enough_images_error`));
      return null;
    }

    if (!iconHash) {
      setError(t(`icon_error`));
      return null;
    }

    if (!title) {
      setError(t(`title_error`));
      return null;
    }

    if (!description) {
      setError(t(`description_error`));
      return null;
    }

    const explorer = new ExplorerBanner(zilpay.instance);

    try {
      const ipfs = (await IPFSnano).at(INFURA);
      const doc = JSON.stringify({
        text: description
      });
      const cid = await ipfs.add(doc);

      const { TranID } = await explorer.addApplication({
        title,
        url,
        category: list[category].value,
        desUrl: cid,
        ipfsIcon: iconHash,
        ipfsImage: hashs
      });

      setTxId(TranID);
      setModalShow(true);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(true);
  }, [category, iconHash, title, hashs, url, description, zilpay]);

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

    const icon = window.localStorage.getItem(StorageFields.AppIconHash);
    
    if (icon) {
      setIconHash(icon);
    }

    const appUrl = window.localStorage.getItem(StorageFields.AppUrl);
    
    if (appUrl) {
      setUrl(appUrl);
    }

    const appCategory = window.localStorage.getItem(StorageFields.AppCategory);
    
    if (appCategory) {
      setCategory(Number(appCategory));
    }
  }, []);

  React.useEffect(() => {
    if (zilpay.code === -1) {
      setNoZilPayModal(true);
    }
  }, [zilpay]);

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
                <BannerImage
                  key={image}
                  hash={image}
                  onRemove={() => handleRemoveImage(image)}
                />
              ))}
            </Slider>
          </div>
          {hashs.length < 3 ? (
            <>
              <Dropzone onUploaded={hanldeUploadedBanner}/>
              <label style={{ width: `80%` }}>
                <Text>
                  add IPFS image manually
                </Text>
                <Input
                  disabled={loading}
                  placeholder="Pass here your IPFS"
                  type="text"
                  css="width: 100%;"
                  onBlur={hanldeAddIPFS}
                />
              </label>
            </>
          ) : null}
          {!iconHash ? (
            <WrapperDropZOne>
              <Dropzone
                title="Drop an icon"
                onUploaded={hanldeUploadedIcon}
              />
            </WrapperDropZOne>
          ) : (
            <div style={{ margin: `33px` }}>
              <BannerImage
                hash={iconHash}
                onRemove={() => hanldeUploadedIcon(``)}
              />
            </div>
          )}
          <Text
            fontVariant={StyleFonts.Bold}
            fontColors={Colors.Danger}
            size="24px"
          >
            {error}
          </Text>
          <DropDown
            items={list}
            selected={category}
            disabled={loading}
            onSelect={handleChangeCategory}
          />
          <FormWrapper onSubmit={handleSubmit}>
            <label style={{ width: `80%` }}>
              <Text>
                {t(`title`)}
              </Text>
              <Input
                value={title}
                disabled={loading}
                maxLength={30}
                required
                placeholder="DragonZIL"
                type="text"
                css="width: 100%;"
                onChange={(e) => handleChangeTitle(e.target.value)}
              />
            </label>
            <label style={{ width: `80%` }}>
              <Text>
                {t(`app_description`)}
              </Text>
              <Input
                value={description}
                disabled={loading}
                maxLength={200}
                required
                placeholder="The best game of zilliqa"
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
                required
                placeholder="https://dragonzil.xyz/"
                css="width: 100%;"
                onChange={(e) => handleChangeUrl(e.target.value)}
              />
            </label>
            <Button
              disabled={loading}
              css="margin: 36px;"
            >
              {loading ? (
                <Loader
                  type="Puff"
                  color={Colors.Secondary}
                  height={15}
                  width={15}
                />
              ): `Upload`}
            </Button>
          </FormWrapper>
        </Wrapper>
      </Container>
      <Modal
        show={modalShow}
        onClose={() => setModalShow(false)}
      >
        <Text
          fontColors={Colors.White}
          fontVariant={StyleFonts.Bold}
          size="24px"
        >
          {t(`sent_modal_head`)}
        </Text>
        <Text size="16px">
          <strong>
            {t(`sent_banner_tx_title`)}
          </strong>
        </Text>
        <Text size="16px">
          {t(`sent_app_tx`)}
        </Text>
        <ButtonsWrapper>
          <Button
            fontColors={Colors.Warning}
            color={Colors.Warning}
            onClick={() => setModalShow(false)}
          >
            {t(`sent_banner_tx_btn_close`)}
          </Button>
          <a
            href={`${VIEW_BLOCK}/tx/${txId}`}
            target="_blank" rel="noreferrer"
          >
            <Button>
              {t(`sent_banner_tx_btn_view`)}
            </Button>
          </a>
        </ButtonsWrapper>
      </Modal>
      <Modal
        show={noZilPayModal}
        onClose={() => null}
      >
        <Text
          fontColors={Colors.White}
          fontVariant={StyleFonts.Bold}
          size="24px"
        >
          {t(`doent_installed_zilpay`)}
        </Text>
        <Text size="16px">
          {t(`doent_installed_zilpay_desc`)}
        </Text>
        <InstallButton />
        <Button
          color={Colors.Warning}
          fontColors={Colors.Warning}
          css="margin: 50px;"
          onClick={() => window.location.reload()}
        >
          {t(`refresh`)}
        </Button>
      </Modal>
    </>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`explorer`, `common`]),
  },
});

export default SubmitAppPage;
