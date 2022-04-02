import styles from "./index.module.scss";

import { useTranslation } from 'next-i18next'
import React from 'react'
import Link from 'next/link'
import Image from "next/image";
import { ConnectZIlPay } from "../zilpay-connect";

export const NavBar: React.FC = () => {
  const { t } = useTranslation(`common`);

  return (
    <nav className={styles.navbar}>
      <Link href="/" passHref>
        <div className={styles.logo}>
          <Image
            src="/icons/zilpay.svg"
            alt="Logo"
            height={30}
            width={30}
          />
          <h3>
            ZilPay
          </h3>
        </div>
      </Link>
      <div className={styles.center}>
        <Link href="/swap" passHref>
          <h3>
            SWAP
          </h3>
        </Link>
        <Link href="/pool" passHref>
          <h3>
            POOL
          </h3>
        </Link>
      </div>
      <ConnectZIlPay />
    </nav>
  );
};
