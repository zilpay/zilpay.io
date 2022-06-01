import styles from '@/styles/pages/policy.module.scss';

import { useTranslation } from 'next-i18next';
import React from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export const PolicyPage: NextPage = () => {
  const { t } = useTranslation(`policy`);

  return (
    <div className={styles.policy}>
      <Head>
        <title>{t(`head_title`)}</title>
        <meta
          property="og:title"
          content={t(`head_title`)}
          key="title"
        />
      </Head>
      <div className={styles.dummy}/>
      <div className={styles.wrapper}>
        <p className={styles.muted}>
          {t(`last_update`)}
        </p>
        <h1>
          {t(`title`)}
        </h1>
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
        <p>
          <strong>
            {t(`sub_title4`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p5`)}
        </p>
        <p>
          <strong>
            {t(`sub_title6`)}
          </strong>
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
        <p className={styles.muted}>
          {t(`p11`)}
        </p>
        <p className={styles.muted}>
          {t(`p12`)}
        </p>
        <p className={styles.muted}>
          {t(`p13`)}
        </p>
        <p>
          <strong>
            {t(`sub_title14`)}
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
        <p className={styles.muted}>
          {t(`p18`)}
        </p>
        <p className={styles.muted}>
          {t(`p19`)}
        </p>
        <p className={styles.muted}>
          {t(`p20`)}
        </p>
        <p className={styles.muted}>
          {t(`p21`)}
        </p>
        <p className={styles.muted}>
          {t(`p22`)}
        </p>
        <p className={styles.muted}>
          {t(`p23`)}
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
        <p className={styles.muted}>
          {t(`p27`)}
        </p>
        <p className={styles.muted}>
          {t(`p28`)}
        </p>
        <p className={styles.muted}>
          {t(`p29`)}
        </p>
        <p>
          <strong>
            {t(`sub_title30`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p31`)}
        </p>
        <p className={styles.muted}>
          {t(`p32`)}
        </p>
        <p>
          <strong>
            {t(`sub_title33`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p34`)}
        </p>
        <p className={styles.muted}>
          {t(`p35`)}
        </p>
        <p className={styles.muted}>
          {t(`p36`)}
        </p>
        <p>
          <strong>
            {t(`sub_title37`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p38`)}
        </p>
        <p className={styles.muted}>
          {t(`p39`)}
        </p>
        <p className={styles.muted}>
          {t(`p40`)}
        </p>
        <p>
          <strong>
            {t(`sub_title41`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p42`)}
        </p>
        <p className={styles.muted}>
          {t(`p43`)}
        </p>
        <p className={styles.muted}>
          {t(`p44`)}
        </p>
        <p>
          <strong>
            {t(`sub_title45`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p46`)}
        </p>
        <p className={styles.muted}>
          {t(`p47`)}
        </p>
        <p className={styles.muted}>
          {t(`p48`)}
        </p>
        <p className={styles.muted}>
          {t(`p49`)}
        </p>
        <p className={styles.muted}>
          {t(`p50`)}
        </p>
        <p>
          <strong>
            {t(`sub_title51`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p52`)}
        </p>
        <p className={styles.muted}>
          {t(`p53`)}
        </p>
        <p>
          <strong>
            {t(`sub_title54`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p55`)}
        </p>
        <p className={styles.muted}>
          {t(`p56`)}
        </p>
        <p>
          <strong>
            {t(`sub_title57`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p58`)}
        </p>
        <p className={styles.muted}>
          {t(`p59`)}
        </p>
        <p>
          <strong>
            {t(`sub_title60`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p61`)}
        </p>
        <p className={styles.muted}>
          {t(`p62`)}
        </p>
        <p className={styles.muted}>
          {t(`p63`)}
        </p>
        <p className={styles.muted}>
          {t(`p64`)}
        </p>
        <p>
          <strong>
            {t(`sub_title65`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p66`)}
        </p>
        <p className={styles.muted}>
          {t(`p67`)}
        </p>
        <p className={styles.muted}>
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
