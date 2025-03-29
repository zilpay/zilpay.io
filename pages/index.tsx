import styles from '@/styles/pages/main.module.scss';

import type { NextPage } from 'next';

import Image from "next/image";
import Head from 'next/head';
import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { InfoCard } from '@/components/info-card';

import { AppLinks } from '@/config/links';
import GitHubIcon from '@/components/icons/github';
import LinkedinIcon from '@/components/icons/linkedin';
import TwitterIcon from '@/components/icons/twitter';
import { SmartButton } from '@/components/smart-button';

type Prop = {
  userAgent: string;
};

const MainPage: NextPage<Prop> = (props) => {
  const { t } = useTranslation(`main`);

  return (
    <>
      <Head>
        <title>{t(`head_title`)}</title>
        <meta
          property="og:title"
          content={t(`head_title`)}
          key="title"
        />
      </Head>
      <section className={styles.main}>
        <div className={styles.wrapper}>
          <h1>
            {t('main.title')}
          </h1>
          <h2>
            {t('main.sub_title')}
          </h2>
        </div>
        <div className={styles.btns}>
          <a href={AppLinks.IOS}>
            <div className={styles.iosbtn}/>
          </a>
          <a href={AppLinks.GOOGLE}>
            <div className={styles.googlebtn}/>
          </a>
          <a href={AppLinks.RUSTORE}>
            <div className={styles.rustorebtn}/>
          </a>
          <a href={AppLinks.APK}>
            <div className={styles.apkbtn}/>
          </a>
        </div>
        <SmartButton userAgent={props.userAgent}/>
      </section>
      <section className={styles.features}>
        <div className={styles.cards}>
          <InfoCard
              url="/icons/info-0.svg"
              title={t(`info.card_0.title`)}
            >
              {t(`info.card_0.sub_title`)}
            </InfoCard>
            <InfoCard
              url="/icons/info-1.svg"
              title={t(`info.card_1.title`)}
              selected
            >
              {t(`info.card_1.sub_title`)}
            </InfoCard>
            <InfoCard
              url="/icons/info-2.svg"
              title={t(`info.card_2.title`)}
            >
              {t(`info.card_2.sub_title`)}
            </InfoCard>
        </div>
      </section>
      <section className={styles.features}>
        <div className={styles.header}>
          <h1>
            {t(`features.title`)}
          </h1>
          <p>
            {t(`features.sub_title`)}
          </p>
        </div>
        <div className={styles.cards}>
          <InfoCard
            url="/icons/wallet.svg"
            title={t(`features.card_0.title`)}
          >
            {t(`features.card_0.sub_title`)}
          </InfoCard>
          <InfoCard
            url="/icons/location.svg"
            title={t(`features.card_1.title`)}
          >
            {t(`features.card_1.sub_title`)}
          </InfoCard>
          <InfoCard
            url="/icons/key.svg"
            title={t(`features.card_2.title`)}
          >
            {t(`features.card_2.sub_title`)}
          </InfoCard>
          <InfoCard
            url="/icons/lock.svg"
            title={t(`features.card_3.title`)}
          >
            {t(`features.card_3.sub_title`)}
          </InfoCard>
          <InfoCard
            url="/icons/settings.svg"
            title={t(`features.card_4.title`)}
          >
            {t(`features.card_4.sub_title`)}
          </InfoCard>
          <InfoCard
            url="/icons/rokket.svg"
            title={t(`features.card_5.title`)}
          >
            {t(`features.card_5.sub_title`)}
          </InfoCard>
        </div>
      </section>
      <section className={styles.team}>
        <div className={styles.header}>
          <h1>
            {t(`team.title`)}
          </h1>
        </div>
        <div className={styles.teamwrapp}>
          <div className={styles.teamcard}>
            <Image
              src="/images/rinat.webp"
              alt="me"
              height={200}
              width={200}
            />
            <h3>
              Rinat Khasanshin
            </h3>
            <p>
              CO-FOUNDER & CEO
            </p>
            <hr />
            <div>
              <a
                href="https://github.com/hicaru"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon
                  height={15}
                  width={15}
                  color="var(--muted-color)"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/arc-warden/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinIcon
                  height={15}
                  width={15}
                  color="var(--muted-color)"
                />
              </a>
              <a
                href="https://twitter.com/lich666black"
                target="_blank"
                rel="noreferrer"
              >
                <TwitterIcon
                  height={15}
                  width={15}
                  color="var(--muted-color)"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
};


export async function getServerSideProps(context: GetServerSidePropsContext) {
  let userAgent;

  if (context.req) { // if you are on the server and you get a 'req' property from your context
    userAgent = context.req.headers['user-agent'] // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent // if you are on the client you can access the navigator from the window object
  }

  return {
    props: {
      userAgent,
      ...await serverSideTranslations(context.locale || `en`, [`main`, `common`]),
    }
  }
}



export default MainPage;
