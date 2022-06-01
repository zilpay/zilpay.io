import styles from '@/styles/pages/policy.module.scss';

import { useTranslation } from 'next-i18next';
import React from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export const ExtensionPolicyPage: NextPage = () => {
  const { t } = useTranslation(`extension-policy`);

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
          {t(`head_title`)}
        </h1>
        <p>
          <strong>
            {t(`title0`)}
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
        <p>
          <strong>
            {t(`title1`)}
          </strong>
        </p>
        <ul>
          <li>
            <p className={styles.muted}>
              {t(`collections0`)}
            </p>
          </li>
          <li>
            <p className={styles.muted}>
              {t(`collections1`)}
            </p>
          </li>
        </ul>
        <p>
          <strong>
            {t(`title2`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p4`)}
        </p>
        <p>
          <strong>
            {t(`title3`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p5`)}
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
        <p>
          <strong>
            {t(`title4`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p9`)}
        </p>
        <p>
          {t(`p10`)}
        </p>
        <p>
          <strong>
            {t(`title5`)}
          </strong>
        </p>
        <ul>
          <li>
            <p className={styles.muted}>
              {t(`stores0`)}
            </p>
          </li>
          <li>
            <p className={styles.muted}>
              {t(`stores1`)}
            </p>
          </li>
          <li>
            <p className={styles.muted}>
              {t(`stores2`)}
            </p>
          </li>
          <li>
            <p className={styles.muted}>
              {t(`stores3`)}
            </p>
          </li>
          <li>
            <p className={styles.muted}>
              {t(`stores4`)}
            </p>
          </li>
          <li>
            <p className={styles.muted}>
              {t(`stores5`)}
            </p>
          </li>
        </ul>
        <p>
          <strong>
            {t(`title6`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p11`)}
        </p>
        <p>
          <strong>
            {t(`title7`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p12`)}
        </p>
        <p>
          <strong>
            {t(`title8`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p13`)}
        </p>
        <p>
          <strong>
            {t(`title9`)}
          </strong>
        </p>
        <p className={styles.muted}>
          {t(`p14`)}
        </p>
      </div>
    </div>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
    props: {
      ...await serverSideTranslations(props.locale || `en`, [`extension-policy`, `common`]),
    },
  });

export default ExtensionPolicyPage;
