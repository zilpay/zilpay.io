import "@/styles/components/pages/_terms.scss";

import { useTranslation } from 'next-i18next';
import React from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export const ExtensionPolicyPage: NextPage = () => {
  const { t } = useTranslation(`extension-policy`);

  return (
    <div className="extension-policy">
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
        <p className="light">
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
            {t(`title1`)}
          </strong>
        </p>
        <ul>
          <li>
            <p className="light">
              {t(`collections0`)}
            </p>
          </li>
          <li>
            <p className="light">
              {t(`collections1`)}
            </p>
          </li>
        </ul>
        <p>
          <strong>
            {t(`title2`)}
          </strong>
        </p>
        <p className="light">
          {t(`p4`)}
        </p>
        <p>
          <strong>
            {t(`title3`)}
          </strong>
        </p>
        <p className="light">
          {t(`p5`)}
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
        <p>
          <strong>
            {t(`title4`)}
          </strong>
        </p>
        <p className="light">
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
            <p className="light">
              {t(`stores0`)}
            </p>
          </li>
          <li>
            <p className="light">
              {t(`stores1`)}
            </p>
          </li>
          <li>
            <p className="light">
              {t(`stores2`)}
            </p>
          </li>
          <li>
            <p className="light">
              {t(`stores3`)}
            </p>
          </li>
          <li>
            <p className="light">
              {t(`stores4`)}
            </p>
          </li>
          <li>
            <p className="light">
              {t(`stores5`)}
            </p>
          </li>
        </ul>
        <p>
          <strong>
            {t(`title6`)}
          </strong>
        </p>
        <p className="light">
          {t(`p11`)}
        </p>
        <p>
          <strong>
            {t(`title7`)}
          </strong>
        </p>
        <p className="light">
          {t(`p12`)}
        </p>
        <p>
          <strong>
            {t(`title8`)}
          </strong>
        </p>
        <p className="light">
          {t(`p13`)}
        </p>
        <p>
          <strong>
            {t(`title9`)}
          </strong>
        </p>
        <p className="light">
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
