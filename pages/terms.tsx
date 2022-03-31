import "@/styles/components/pages/_terms.scss";

import React from 'react';
import Head from 'next/head';

import { useTranslation } from 'next-i18next';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const TermsPage: NextPage = () => {
  const { t } = useTranslation(`terms`);

  return (
    <div className="terms">
      <div className="dummy" />
      <Head>
        <title>{t(`head_title`)}</title>
        <meta
          property="og:title"
          content={t(`head_title`)}
          key="title"
        />
      </Head>
      <div className="wrapper">
        <p className="light">
          {t(`last_update`)}
        </p>
        <h1>
          {t(`title`)}
        </h1>
        <p>
          <strong>
            {t(`sub_title0`)}
          </strong>
        </p>
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
        <p className="light">
          {t(`p4`)}
        </p>
        <p>
          <strong>
            {t(`subt_title1`)}
          </strong>
        </p>
        <p className="light">
          {t(`p5`)}
        </p>
        <p className="light">
          {t(`p6`)}
        </p>
        <p>
          <strong>
            {t(`subt_title2`)}
          </strong>
        </p>
        <p className="light">
          {t(`p6`)}
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
        <p>
          <strong>
            {t(`subt_title3`)}
          </strong>
        </p>
        <p>
          <strong>
            {t(`subt_title4`)}
          </strong>
        </p>
        <p className="light">
          {t(`p11`)}
        </p>
        <p>
          <strong>
            {t(`subt_title5`)}
          </strong>
        </p>
        <p className="light">
          {t(`p12`)}
        </p>
        <p>
          <strong>
            {t(`subt_title6`)}
          </strong>
        </p>
        <p className="light">
          {t(`p13`)}
        </p>
        <p>
          <strong>
            {t(`subt_title7`)}
          </strong>
        </p>
        <p className="light">
          {t(`p14`)}
        </p>
        <p>
          <strong>
            {t(`subt_title8`)}
          </strong>
        </p>
        <p>
          <strong>
            {t(`subt_title9`)}
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
        <p>
          <strong>
            {t(`subt_title10`)}
          </strong>
        </p>
        <p className="light">
          {t(`p18`)}
        </p>
        <p>
          <strong>
            {t(`subt_title11`)}
          </strong>
        </p>
        <p className="light">
          {t(`p19`)}
        </p>
        <p>
          <strong>
            {t(`subt_title12`)}
          </strong>
        </p>
        <p>
          <strong>
            {t(`subt_title13`)}
          </strong>
        </p>
        <p className="light">
          {t(`p20`)}
        </p>
        <p className="light">
          {t(`p21`)}
        </p>
        <p>
          <strong>
            {t(`subt_title14`)}
          </strong>
        </p>
        <p className="light">
          {t(`p22`)}
        </p>
        <p className="light">
          {t(`p23`)}
        </p>
        <p>
          <strong>
            {t(`subt_title15`)}
          </strong>
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
        <p>
          <strong>
            {t(`subt_title16`)}
          </strong>
        </p>
        <p className="light">
          {t(`p27`)}
        </p>
        <p>
          <strong>
            {t(`subt_title17`)}
          </strong>
        </p>
        <p className="light">
          {t(`p28`)}
        </p>
        <p className="light">
          {t(`p29`)}
        </p>
        <p>
          <strong>
            {t(`subt_title18`)}
          </strong>
        </p>
        <p className="light">
          {t(`p30`)}
        </p>
        <p>
          <strong>
            {t(`subt_title19`)}
          </strong>
        </p>
        <p className="light">
          {t(`p31`)}
        </p>
        <p>
          <strong>
            {t(`subt_title20`)}
          </strong>
        </p>
        <p className="light">
          {t(`p32`)}
        </p>
        <p>
          <strong>
            {t(`subt_title21`)}
          </strong>
        </p>
        <p className="light">
          {t(`p33`)}
        </p>
        <p>
          <strong>
            {t(`subt_title22`)}
          </strong>
        </p>
        <p className="light">
          {t(`p34`)}
        </p>
        <p>
          <strong>
            {t(`subt_title23`)}
          </strong>
        </p>
        <p className="light">
          {t(`p35`)}
        </p>
        <p>
          <strong>
            {t(`subt_title24`)}
          </strong>
        </p>
        <p className="light">
          {t(`p36`)}
        </p>
        <p className="light">
          {t(`p37`)}
        </p>
        <p className="light">
          {t(`p38`)}
        </p>
        <p>
          <strong>
            {t(`subt_title25`)}
          </strong>
        </p>
        <p className="light">
          {t(`p39`)}
        </p>
        <p className="light">
          {t(`p40`)}
        </p>
        <p>
          <strong>
            {t(`subt_title26`)}
          </strong>
        </p>
        <p className="light">
          {t(`p41`)}
        </p>
        <p className="light">
          {t(`p42`)}
        </p>
        <p>
          <strong>
            {t(`subt_title27`)}
          </strong>
        </p>
        <p className="light">
          <strong>
            {t(`subt_title28`)}
          </strong>
        </p>
        <p className="light">
          {t(`p43`)}
        </p>
        <p className="light">
          {t(`p44`)}
        </p>
        <p>
          <strong>
            {t(`subt_title29`)}
          </strong>
        </p>
        <p className="light">
          {t(`p45`)}
        </p>
        <p>
          <strong>
            {t(`subt_title30`)}
          </strong>
        </p>
        <p className="light">
          {t(`p46`)}
        </p>
      </div>
    </div>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
    props: {
      ...await serverSideTranslations(props.locale || `en`, [`terms`, `common`]),
    },
  });

export default TermsPage;
