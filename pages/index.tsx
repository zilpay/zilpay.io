import styles from '@/styles/pages/main.module.scss';

import type { NextPage } from 'next'

import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MainPage: NextPage = () => {
  return (
    <div>
      <br />
      <br />
      <br />
    </div>
  )
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`main`, `common`]),
  },
});

export default MainPage;
