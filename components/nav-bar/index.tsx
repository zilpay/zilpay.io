import styles from "./index.module.scss";

import { useTranslation } from 'next-i18next'
import React from 'react'
import Link from 'next/link'

export const NavBar: React.FC = () => {
  const { t } = useTranslation(`common`);

  return (
    <nav></nav>
  );
};
