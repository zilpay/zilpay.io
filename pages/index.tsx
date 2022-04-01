import type { NextPage } from 'next'

import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MainPage: NextPage = () => {
  return (
    <div></div>
  )
}

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...await serverSideTranslations(props.locale || `en`, [`main`, `common`]),
  },
});

export default MainPage;
