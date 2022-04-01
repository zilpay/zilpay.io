import styles from "./index.module.scss";

import { useTranslation } from 'next-i18next'
import React from 'react'
import Link from 'next/link'
import Image from "next/image";

export const NavBar: React.FC = () => {
  const { t } = useTranslation(`common`);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image
          src="/icons/zilpay.svg"
          height="30"
          width-="30"
        />
        <h3>
          ZilPay
        </h3>
      </div>
      <div className={styles.center}></div>
      <div></div>
    </nav>
  );
};
