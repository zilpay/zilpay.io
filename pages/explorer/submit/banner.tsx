import 'react-rangeslider/lib/index.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import BN from 'bn.js';
import dynamic from 'next/dynamic';
import React from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import styled from 'styled-components';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Text } from 'components/text';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Modal } from 'components/modal';
import { InstallButton } from 'components/sections/main';

import { useZilPay } from 'mixins/zilpay';
import { ExplorerBanner } from 'mixins/place-banner';
import { Explorer } from 'mixins/explorer';
import { ZLPExplorer } from 'mixins/zlp';

import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { VIEW_BLOCK } from 'config/explorer';
import { StorageFields } from 'config/storage-fields';

const Dropzone = dynamic(import(`components/dropzone`));
const BannerImage = dynamic(import(`components/banner-image`));
const Slider = dynamic(import(`react-rangeslider`));
const Loader = dynamic(import(`react-loader-spinner`));

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
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 900px;
  width: 100%;
  padding: 16px;

  .rangeslider {
    min-width: 200px;
    width: 100%;
  }

  .rangeslider-horizontal .rangeslider__fill {
    background-color: ${Colors.Secondary};
    border-radius: 8px;
  }

  .rangeslider {
    background-color: ${Colors.Dark};
    margin-top: 80px;
  }

  .rangeslider__handle-tooltip {
    background-color: ${Colors.Dark};
    color: ${Colors.Secondary};
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;

  div {
    margin: 10px;
  }
`;
const TitleWrapper = styled.aside`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-left: 45px;
  padding-right: 45px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const SubmitBannerPage: NextPage = () => {
  const { t } = useTranslation(`explorer`);
  const zilpay = useZilPay();
  const [modalShow, setModalShow] = React.useState(false);
  const [noZilPayModal, setNoZilPayModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [hash, setHash] = React.useState(``);
  const [url, setUrl] = React.useState(``);
  const [amount, setAmount] = React.useState(500);
  const [blocks, setBlocks] = React.useState(1);
  const [reserve, setReserve] = React.useState(`3000`);
  const [approved, setApproved] = React.useState(new BN(0));
  const [balance, setBalance] = React.useState(0);
  const [txId, setTxId] = React.useState(``);

  const bnAmount = React.useMemo(() => {
    const _value = new BN(Math.round(amount));
    return _value.mul(ZLPExplorer.DECIMAL);
  }, [amount]);

  const hanldeUploaded = React.useCallback((ipfsHash: string) => {
    window.localStorage.setItem(StorageFields.BannerHash, ipfsHash);
    setHash(ipfsHash);
  }, []);
  const hanldeRemoveImage = React.useCallback(() => {
    window.localStorage.removeItem(StorageFields.BannerHash);
    setHash(``);
  }, []);

  const handleChangeAmount = React.useCallback((amountZLP: number) => {
    const result = ExplorerBanner.estimateBlocks(amountZLP, reserve);

    setAmount(amountZLP);
    setBlocks(Number(result.blocks));
  }, [reserve]);
  const handleChangeBlocks = React.useCallback((blocksValue: number) => {
    const { price, decimal } = ExplorerBanner.estimateBlocks(1, reserve);

    setAmount(Number(price) / decimal * blocksValue);
    setBlocks(blocksValue);
  }, [reserve]);
  const handleChangeUrl = React.useCallback((value: string) => {
    try {
      const { href } = new URL(value);
      window.localStorage.setItem(StorageFields.BannerUrl, href);
      setUrl(href);
    } catch {
      //
    }
  }, []);

  const handleApprove = React.useCallback(async() => {
    if (zilpay.instance) {
      setLoading(true);
      try {
        const zlp = new ZLPExplorer(zilpay.instance);
        const bannerControll = new ExplorerBanner(zilpay.instance);
        const { TranID } = await zlp.approve(bannerControll.selfAddress);
  
        const observer = zlp
          .zilpay
          .wallet
          .observableTransaction(TranID)
          .subscribe(async(hashs: string[]) => {
            if (Array.isArray(hashs) && hashs[0] && hashs[0] === TranID) {
              setLoading(false);
              const allowances = await zlp.getAllowances(bannerControll.selfAddress);
    
              setApproved(allowances);
              observer.unsubscribe();
            }
          }); 
      } catch {
        setLoading(false);
      }
    }
  }, [zilpay]);
  const handlePlace = React.useCallback(async() => {
    if (zilpay.instance) {
      setLoading(true);
      try {
        const bannerControll = new ExplorerBanner(zilpay.instance);
        const { TranID } = await bannerControll.place(amount, url, hash);
 
        setTxId(TranID);
        setModalShow(true);
      } catch {
        //
      }
      setLoading(false);
    }
  }, [zilpay, amount, hash, url]);

  const handleUpdate = React.useCallback(async() => {
    if (!zilpay.instance) {
      return null;
    }

    setLoading(true);

    try {
      const zlp = new ZLPExplorer(zilpay.instance);
      const bannerControll = new ExplorerBanner(zilpay.instance);
      const allowances = await zlp.getAllowances(bannerControll.selfAddress);
      
      setApproved(allowances);
  
      const ownerBalance = await zlp.getBalance(zlp.zilpay.wallet.defaultAccount.base16);
      const ownerAmount = Number(ownerBalance) / Number(ZLPExplorer.DECIMAL);
      setBalance(Math.hypot(Number(ownerAmount.toFixed(6))));
    } catch {
      //
    }

    setLoading(false);

    return null;
  }, [zilpay]);

  React.useEffect(() => {
    const ipfsHash = window.localStorage.getItem(StorageFields.BannerHash);

    if (ipfsHash) {
      setHash(String(ipfsHash));
    }

    const stredUrl = window.localStorage.getItem(StorageFields.BannerUrl);

    if (stredUrl) {
      setUrl(stredUrl);
    }
  }, []);

  React.useEffect(() => {
    if (zilpay.instance) {
      const explorer = new Explorer(zilpay.instance);
      const zlp = new ZLPExplorer(zilpay.instance);

      if (zlp.zilpay.wallet.isConnect && zlp.zilpay.wallet.isEnable) {
        explorer.getReserve().then((r) => {
          setReserve(r);
          const result = ExplorerBanner.estimateBlocks(amount, r);

          setBlocks(Number(result.blocks));
        });

        handleUpdate();

        const observable = zlp
          .zilpay
          .wallet
          .observableAccount()
          .subscribe(() => handleUpdate());

          return () => {
            observable.unsubscribe();
          }
        }
    }

    if (zilpay.code === -1) {
      setNoZilPayModal(true);
    }
  }, [zilpay]);

  return (
    <>
      <Head>
        <title>{t(`banner_page_title`)} - ZilPay</title>
        <meta
          property="og:title"
          content={`${t(`banner_page_title`)} - ZilPay`}
          key="title"
        />
      </Head>
      <Container>
        <TitleWrapper>
          <Text
            fontVariant={StyleFonts.Bold}
            fontColors={Colors.White}
            size="25px"
          >
            {t(`banner_page_title`)}
          </Text>
          <a
            href="https://zilswap.io"
            target="_blank" rel="noreferrer"
          >
            <Button
              color={balance < amount ? Colors.Warning : Colors.Secondary}
              fontColors={balance < amount ? Colors.Warning : Colors.Secondary}
            >
              {balance === 0 ? t(`buy_on_zilswap`) : `${balance} ZLP`}
            </Button>
          </a>
        </TitleWrapper>
        <Wrapper>
          {hash ? (
            <BannerImage
              hash={hash}
              onRemove={hanldeRemoveImage}
            />
          ) : (
            <Dropzone onUploaded={hanldeUploaded}/>
          )}
          <FormWrapper>
            <label style={{ width: `80%` }}>
              <Text>
                IPFS HASH
              </Text>
              <Input
                value={hash}
                disabled={loading}
                type="text"
                css="width: 100%;"
                onChange={(e) => setHash(e.target.value)}
              />
            </label>
            <label style={{ width: `80%` }}>
              <Text>
                URL
              </Text>
              <Input
                value={url}
                placeholder={t(`url_placeholder`)}
                disabled={loading}
                type="url"
                css="width: 100%;"
                onChange={(e) => handleChangeUrl(e.target.value)}
              />
            </label>
            {hash ? (
              <>
              <Slider
                min={1}
                max={ExplorerBanner.MAX_BLOCKS.toNumber()}
                value={amount}
                disabled={loading}
                onChange={handleChangeAmount}
              />
              <ButtonsWrapper>
                <label>
                  <Text>
                    {t(`amount_zlp`)}
                  </Text>
                  <Input
                    value={amount}
                    disabled={loading}
                    type="number"
                    min="1"
                    onChange={(e) => handleChangeAmount(Number(e.target.value))}
                  />
                </label>
                <label>
                  <Text>
                    {t(`blocks_tx`)}
                  </Text>
                  <Input
                    value={blocks}
                    disabled={loading}
                    type="number"
                    min="1"
                    onChange={(e) => handleChangeBlocks(Number(e.target.value))}
                  />
                </label>
              </ButtonsWrapper>
              {loading ? (
                <Loader
                  type="Puff"
                  color={Colors.Secondary}
                  height={100}
                  width={100}
                />
              ) : approved.lt(bnAmount) ? (
                <Button
                  color={Colors.Warning}
                  fontColors={Colors.Warning}
                  css="margin: 30px;"
                  onClick={handleApprove}
                >
                  {t(`unlock`)}
                </Button>
              ) : (
                <Button
                  css="margin: 30px;"
                  onClick={handlePlace}
                >
                  {t(`place`)}
                </Button>
              )}
              </>
            ) : null}
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
          {t(`sent_banner_tx`)}
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
    ...await serverSideTranslations(props.locale || `en`, [`main`, `explorer`, `common`]),
  },
});

export default SubmitBannerPage;
