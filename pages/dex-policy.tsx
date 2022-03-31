import "@/styles/components/pages/_terms.scss";

import { useTranslation } from 'next-i18next';
import React from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export const ExtensionPolicyPage: NextPage = () => {
  const { t } = useTranslation(`dex-policy`);

  return (
    <div className="dex-policy">
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
          {t(`head_title`)}
        </h1>
        <p>
          {t(`part0.p0`)}
        </p>
        <p>
          {t(`part0.p1`)}
        </p>
        <p>
          {t(`part0.p2`)}
        </p>
        <h1>
          {t(`part1.title`)}
        </h1>
        <p>
          {t(`part1.p0`)}
        </p>
        <h1>
          {t(`part2.title`)}
        </h1>
        <p>
          {t(`part2.p0`)}
        </p>
        <p>
          {t(`part2.p1`)}
        </p>
        <h1>
          {t(`part3.title`)}
        </h1>
        <p>
          {t(`part3.p0`)}
        </p>
        <h2>
          {t(`part4.title`)}
        </h2>
        <p>
          {t(`part4.p0`)}
        </p>
        <h2>
          {t(`part5.title`)}
        </h2>
        <p>
          {t(`part5.p0`)}
        </p>
        <p>
          {t(`part5.p1`)}
        </p>
        <p>
          {t(`part5.p2`)}
        </p>
        <h2>
          {t(`part6.title`)}
        </h2>
        <p>
          {t(`part6.p0`)}
        </p>
        <p>
          {t(`part6.p1`)}
        </p>
        <p>
          {t(`part6.p2`)}
        </p>
        <p>
          {t(`part6.p3`)}
        </p>
        <p>
          {t(`part6.p4`)}
        </p>
        <p>
          {t(`part6.p5`)}
        </p>
        <p>
          {t(`part6.p6`)}
        </p>
        <p>
          {t(`part6.p7`)}
        </p>
        <p>
          {t(`part6.p8`)}
        </p>
        <h2>
          {t(`part7.title`)}
        </h2>
        <p>
          {t(`part7.p0`)}
        </p>
        <p>
          {t(`part7.p1`)}
        </p>
        <h2>
          {t(`part8.title`)}
        </h2>
        <p>
          {t(`part8.p0`)}
        </p>
        <h2>
          {t(`part9.title`)}
        </h2>
        <p>
          {t(`part9.p0`)}
        </p>
        <h2>
          {t(`part10.title`)}
        </h2>
        <p>
          {t(`part10.p0`)}
        </p>
        <h2>
          {t(`part11.title`)}
        </h2>
        <p>
          {t(`part11.p0`)}
        </p>
        <p>
          {t(`part11.p1`)}
        </p>
        <h2>
          {t(`part12.title`)}
        </h2>
        <p>
          {t(`part12.p0`)}
        </p>
        <h2>
          {t(`part13.title`)}
        </h2>
        <p>
          {t(`part13.p0`)}
        </p>
        <h2>
          {t(`part14.title`)}
        </h2>
        <p>
          {t(`part14.p0`)}
        </p>
        <h2>
          {t(`part15.title`)}
        </h2>
        <p>
          {t(`part15.p0`)}
        </p>
        <h2>
          {t(`part16.title`)}
        </h2>
        <p>
          {t(`part16.p0`)}
        </p>
        <h2>
          {t(`part17.title`)}
        </h2>
        <p>
          {t(`part17.p0`)}
        </p>
      </div>
    </div>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
    props: {
      ...await serverSideTranslations(props.locale || `en`, [`dex-policy`, `common`]),
    },
  });

export default ExtensionPolicyPage;
