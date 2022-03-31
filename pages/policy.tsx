import "@/styles/components/pages/_terms.scss";

import { useTranslation } from 'next-i18next';
import React from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export const PolicyPage: NextPage = () => {
  const { t } = useTranslation(`policy`);

  return (
    <div className="policy">
      <Head>
        <title>{t(`head_title`)}</title>
        <meta
          property="og:title"
          content={t(`head_title`)}
          key="title"
        />
      </Head>
      <div className="dummy"/>
      <div className="wrapper">
        <p>
          {t(`last_update`)}
        </p>
        <h1>
          {t(`title`)}
        </h1>
        <p className="light">
          {t(`p0`)}
        </p>
        <p className="light">
          {t(`p1`)}
        </p>
        <p className="light">
          {t(`p2`)}
        </p>
        <p className="light">
          {t(`p3`)}
        </p>
        <p>
          <strong>
            {t(`sub_title4`)}
          </strong>
        </p>
        <p className="light">
          {t(`p5`)}
        </p>
        <p>
          <strong>
            {t(`sub_title6`)}
          </strong>
        </p>
        <p className="light">
          {t(`p7`)}
        </p>
        <p className="light">
          {t(`p8`)}
        </p>
        <p className="light">
          {t(`p9`)}
        </p>
        <p className="light">
          {t(`p10`)}
        </p>
        <p className="light">
          {t(`p11`)}
        </p>
        <p className="light">
          {t(`p12`)}
        </p>
        <p className="light">
          {t(`p13`)}
        </p>
        <p>
          <strong>
            {t(`sub_title14`)}
          </strong>
        </p>
        <p className="light">
          {t(`p15`)}
        </p>
        <p className="light">
          {t(`p16`)}
        </p>
        <p className="light">
          {t(`p17`)}
        </p>
        <p className="light">
          {t(`p18`)}
        </p>
        <p className="light">
          {t(`p19`)}
        </p>
        <p className="light">
          {t(`p20`)}
        </p>
        <p className="light">
          {t(`p21`)}
        </p>
        <p className="light">
          {t(`p22`)}
        </p>
        <p className="light">
          {t(`p23`)}
        </p>
        <p className="light">
          {t(`p24`)}
        </p>
        <p className="light">
          {t(`p25`)}
        </p>
        <p className="light">
          {t(`p26`)}
        </p>
        <p className="light">
          {t(`p27`)}
        </p>
        <p className="light">
          {t(`p28`)}
        </p>
        <p className="light">
          {t(`p29`)}
        </p>
        <p>
          <strong>
            {t(`sub_title30`)}
          </strong>
        </p>
        <p className="light">
          {t(`p31`)}
        </p>
        <p className="light">
          {t(`p32`)}
        </p>
        <p>
          <strong>
            {t(`sub_title33`)}
          </strong>
        </p>
        <p className="light">
          {t(`p34`)}
        </p>
        <p className="light">
          {t(`p35`)}
        </p>
        <p className="light">
          {t(`p36`)}
        </p>
        <p>
          <strong>
            {t(`sub_title37`)}
          </strong>
        </p>
        <p className="light">
          {t(`p38`)}
        </p>
        <p className="light">
          {t(`p39`)}
        </p>
        <p className="light">
          {t(`p40`)}
        </p>
        <p>
          <strong>
            {t(`sub_title41`)}
          </strong>
        </p>
        <p className="light">
          {t(`p42`)}
        </p>
        <p className="light">
          {t(`p43`)}
        </p>
        <p className="light">
          {t(`p44`)}
        </p>
        <p>
          <strong>
            {t(`sub_title45`)}
          </strong>
        </p>
        <p className="light">
          {t(`p46`)}
        </p>
        <p className="light">
          {t(`p47`)}
        </p>
        <p className="light">
          {t(`p48`)}
        </p>
        <p className="light">
          {t(`p49`)}
        </p>
        <p className="light">
          {t(`p50`)}
        </p>
        <p>
          <strong>
            {t(`sub_title51`)}
          </strong>
        </p>
        <p className="light">
          {t(`p52`)}
        </p>
        <p className="light">
          {t(`p53`)}
        </p>
        <p>
          <strong>
            {t(`sub_title54`)}
          </strong>
        </p>
        <p className="light">
          {t(`p55`)}
        </p>
        <p className="light">
          {t(`p56`)}
        </p>
        <p>
          <strong>
            {t(`sub_title57`)}
          </strong>
        </p>
        <p className="light">
          {t(`p58`)}
        </p>
        <p className="light">
          {t(`p59`)}
        </p>
        <p>
          <strong>
            {t(`sub_title60`)}
          </strong>
        </p>
        <p className="light">
          {t(`p61`)}
        </p>
        <p className="light">
          {t(`p62`)}
        </p>
        <p className="light">
          {t(`p63`)}
        </p>
        <p className="light">
          {t(`p64`)}
        </p>
        <p>
          <strong>
            {t(`sub_title65`)}
          </strong>
        </p>
        <p className="light">
          {t(`p66`)}
        </p>
        <p className="light">
          {t(`p67`)}
        </p>
        <p className="light">
          {t(`p68`)}
        </p>
      </div>
    </div>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
    props: {
      ...await serverSideTranslations(props.locale || `en`, [`policy`, `common`]),
    },
  });

export default PolicyPage;
