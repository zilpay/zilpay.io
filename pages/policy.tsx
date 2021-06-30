import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const PolicyPage: NextPage = () => {

  return (
    <>
      <div></div>
    </>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => {
  return {
    props: {
      ...await serverSideTranslations(props.locale || 'en', ['policy', 'common']),
    },
  };
};

export default PolicyPage;
