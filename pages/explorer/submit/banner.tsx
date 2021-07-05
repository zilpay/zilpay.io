import 'react-rangeslider/lib/index.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import BN from 'bn.js';
import React from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import styled from 'styled-components';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Dropzone } from 'components/dropzone';
import { Text } from 'components/text';
import { BannerImage } from 'components/banner-image';
import Slider from 'react-rangeslider';
import { Input } from 'components/input';
import { Button } from 'components/button';
import Loader from 'react-loader-spinner';

import { useZilPay } from 'mixins/zilpay';
import { ExplorerBanner } from 'mixins/place-banner';
import { Explorer } from 'mixins/explorer';
import { ZLPExplorer } from 'mixins/zlp';

import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
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
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 900px;
  width: 100%;
  margin-top: 60px;
  padding: 16px;

  .rangeslider {
    min-width: 200px;
    width: 100%;
  }

  .rangeslider-horizontal .rangeslider__fill {
    background-color: ${Colors.Secondary};
    border-radius: 8px;
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

export const SubmitBannerPage: NextPage = () => {
  const { t } = useTranslation(`explorer`);
  const zilpay = useZilPay();
  const [loading, setLoading] = React.useState(false);
  const [hash, setHash] = React.useState('');
  const [amount, setAmount] = React.useState(1);
  const [blocks, setBlocks] = React.useState(1);
  const [reserve, setReserve] = React.useState('3000');
  const [approved, setApproved] = React.useState(new BN(0));

  const bnAmount = React.useMemo(() => {
    const _value = new BN(Math.round(amount));
    return _value.mul(ZLPExplorer.DECIMAL);
  }, [amount]);

  const hanldeUploaded = React.useCallback((hash: string) => {
    window.localStorage.setItem(StorageFields.Bannerhash, hash);
    setHash(hash);
  }, []);
  const hanldeRemoveImage = React.useCallback(() => {
    window.localStorage.removeItem(StorageFields.Bannerhash);
    setHash('');
  }, []);

  const handleChangeAmount = React.useCallback((amount: number) => {
    const { blocks } = ExplorerBanner.estimateBlocks(amount, reserve);

    setAmount(amount);
    setBlocks(Number(blocks));
  }, [reserve]);
  const handleChangeBlocks = React.useCallback((blocks: number) => {
    const { price, decimal } = ExplorerBanner.estimateBlocks(1, reserve);

    setAmount(Number(price) / decimal * blocks);
    setBlocks(blocks);
  }, [reserve]);

  const handleApprove = React.useCallback(async() => {
    if (zilpay.instance) {
      setLoading(true);
      const zlp = new ZLPExplorer(zilpay.instance);
      const bannerControll = new ExplorerBanner(zilpay.instance);
      const { TranID } = await zlp.approve(bannerControll.selfAddress);

      const observer = zlp
        .zilpay
        .wallet
        .observableTransaction(TranID)
        .subscribe(async(hashs: string[]) => {
          console.log(hashs, TranID);
          if (Array.isArray(hashs) && hashs[0] && hashs[0] === TranID) {
            setLoading(false);
            const allowances = await zlp.getAllowances(bannerControll.selfAddress);
  
            setApproved(allowances);
            observer.unsubscribe();
          }
        });
    }
  }, [zilpay]);
  const handlePlace = React.useCallback(async() => {
    if (zilpay.instance) {
      setLoading(true);
      const bannerControll = new ExplorerBanner(zilpay.instance);
      const { TranID } = await bannerControll.place(amount, '', hash);

      const observer = bannerControll
        .zilpay
        .wallet
        .observableTransaction(TranID)
        .subscribe(async(hashs: string[]) => {
          console.log(hashs, TranID);
          if (Array.isArray(hashs) && hashs[0] && hashs[0] === TranID) {
            setLoading(false);
            observer.unsubscribe();
          }
        });
    }
  }, [zilpay, amount, hash]);


  React.useEffect(() => {
    const ipfsHash = window.localStorage.getItem(StorageFields.Bannerhash);

    if (ipfsHash) {
      setHash(String(ipfsHash));
    }
  }, []);

  React.useEffect(() => {
    if (zilpay.instance) {
      const explorer = new Explorer(zilpay.instance);
      const zlp = new ZLPExplorer(zilpay.instance);
      const bannerControll = new ExplorerBanner(zilpay.instance);

      explorer.getReserve().then((r) => {
        setReserve(r);
        const { blocks } = ExplorerBanner.estimateBlocks(amount, r);

        setBlocks(Number(blocks));
      });

      zlp
        .getAllowances(bannerControll.selfAddress)
        .then((value) => setApproved(value));
    }
  }, [zilpay]);

  return (
    <>
      <Head>
        <title>{t('banner_page_title')} - ZilPay</title>
        <meta
          property="og:title"
          content={`${t('banner_page_title')} - ZilPay`}
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
          {t('banner_page_title')}
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
          {hash ? (
            <FormWrapper>
              <Slider
                min={1}
                max={ExplorerBanner.MAX_BLOCKS.toNumber()}
                value={amount}
                onChange={handleChangeAmount}
              />
              <ButtonsWrapper>
                <label>
                  <Text>
                    {t('amount_zlp')}
                  </Text>
                  <Input
                    value={amount}
                    type="number"
                    min="1"
                    onChange={(e) => handleChangeAmount(Number(e.target.value))}
                  />
                </label>
                <label>
                  <Text>
                    {t('blocks_tx')}
                  </Text>
                  <Input
                    value={blocks}
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
                  css="margin: 30px;"
                  onClick={handleApprove}
                >
                  {t('unlock')}
                </Button>
              ) : (
                <Button
                  css="margin: 30px;"
                  onClick={handlePlace}
                >
                  {t('place')}
                </Button>
              )}
            </FormWrapper>
          ) : null}
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
