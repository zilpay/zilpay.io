import styles from '@/styles/pages/policy.module.scss';

import React from 'react';
import Head from 'next/head';

import { useTranslation } from 'next-i18next';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const TermsPage: NextPage = () => {
  const { t } = useTranslation(`terms`);

  return (
    <div className={styles.terms}>
      <div className={styles.dummy} />
      <Head>
        <title>{t(`head_title`)}</title>
        <meta
          property="og:title"
          content={t(`head_title`)}
          key="title"
        />
      </Head>
      <div className={styles.wrapper}>
        <p className={styles.muted}>
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
        <p className={styles.muted}>
          {t(`p0`)}
        </p>
        <p className={styles.muted}>
          {t(`p1`)}
        </p>
        <p className={styles.muted}>
          {t(`p2`)}
        </p>
        <p className={styles.muted}>
          {t(`p3`)}
        </p>
        <p className={styles.muted}>
          {t(`p4`)}
        </p>
        <p>
          <strong>
            {t(`subt_title1`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p5`)}
        </p>
        <p className={styles.muted}>
          {t(`p6`)}
        </p>
        <p>
          <strong>
            {t(`subt_title2`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p6`)}
        </p>
        <p className={styles.muted}>
          {t(`p7`)}
        </p>
        <p className={styles.muted}>
          {t(`p8`)}
        </p>
        <p className={styles.muted}>
          {t(`p9`)}
        </p>
        <p className={styles.muted}>
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
        <p className={styles.muted}>
          {t(`p11`)}
        </p>
        <p>
          <strong>
            {t(`subt_title5`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p12`)}
        </p>
        <p>
          <strong>
            {t(`subt_title6`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p13`)}
        </p>
        <p>
          <strong>
            {t(`subt_title7`)}
          </strong>
        </p>
        <p className={styles.muted}>
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
        <p className={styles.muted}>
          {t(`p15`)}
        </p>
        <p className={styles.muted}>
          {t(`p16`)}
        </p>
        <p className={styles.muted}>
          {t(`p17`)}
        </p>
        <p>
          <strong>
            {t(`subt_title10`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p18`)}
        </p>
        <p>
          <strong>
            {t(`subt_title11`)}
          </strong>
        </p>
        <p className={styles.muted}>
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
        <p className={styles.muted}>
          {t(`p20`)}
        </p>
        <p className={styles.muted}>
          {t(`p21`)}
        </p>
        <p>
          <strong>
            {t(`subt_title14`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p22`)}
        </p>
        <p className={styles.muted}>
          {t(`p23`)}
        </p>
        <p>
          <strong>
            {t(`subt_title15`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p24`)}
        </p>
        <p className={styles.muted}>
          {t(`p25`)}
        </p>
        <p className={styles.muted}>
          {t(`p26`)}
        </p>
        <p>
          <strong>
            {t(`subt_title16`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p27`)}
        </p>
        <p>
          <strong>
            {t(`subt_title17`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p28`)}
        </p>
        <p className={styles.muted}>
          {t(`p29`)}
        </p>
        <p>
          <strong>
            {t(`subt_title18`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p30`)}
        </p>
        <p>
          <strong>
            {t(`subt_title19`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p31`)}
        </p>
        <p>
          <strong>
            {t(`subt_title20`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p32`)}
        </p>
        <p>
          <strong>
            {t(`subt_title21`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p33`)}
        </p>
        <p>
          <strong>
            {t(`subt_title22`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p34`)}
        </p>
        <p>
          <strong>
            {t(`subt_title23`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p35`)}
        </p>
        <p>
          <strong>
            {t(`subt_title24`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p36`)}
        </p>
        <p className={styles.muted}>
          {t(`p37`)}
        </p>
        <p className={styles.muted}>
          {t(`p38`)}
        </p>
        <p>
          <strong>
            {t(`subt_title25`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p39`)}
        </p>
        <p className={styles.muted}>
          {t(`p40`)}
        </p>
        <p>
          <strong>
            {t(`subt_title26`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p41`)}
        </p>
        <p className={styles.muted}>
          {t(`p42`)}
        </p>
        <p>
          <strong>
            {t(`subt_title27`)}
          </strong>
        </p>
        <p className={styles.muted}>
          <strong>
            {t(`subt_title28`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p43`)}
        </p>
        <p className={styles.muted}>
          {t(`p44`)}
        </p>
        <p>
          <strong>
            {t(`subt_title29`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p45`)}
        </p>
        <p>
          <strong>
            {t(`subt_title30`)}
          </strong>
        </p>
        <p className={styles.muted}>
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
