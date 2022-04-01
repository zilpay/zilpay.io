import styles from '@/styles/pages/main.module.scss';

import type { NextPage } from 'next'

import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { InfoCard } from '@/components/info-card';

const MainPage: NextPage = () => {
  const { t } = useTranslation(`main`);

  return (
    <>
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
        <a href="">
          <div className={styles.iosbtn}/>
        </a>
        <a href="">
          <div className={styles.googlebtn}/>
        </a>
        <a href="">
          <div className={styles.apkbtn}/>
        </a>
      </div>
    </section>
    <section>
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
    <section></section>
    <section></section>
    </>
  )
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`main`, `common`]),
  },
});

export default MainPage;
