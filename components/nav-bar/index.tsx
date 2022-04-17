import styles from "./index.module.scss";

import { useTranslation } from 'next-i18next'
import React from 'react';
import { useStore } from "react-stores";
import Link from 'next/link';
import Image from "next/image";

import { ConnectZIlPay } from "@/components/zilpay-connect";
import { Toggle } from "@/components/toggle";
import { $settings, updateSettingsStore, updateFromStorage } from "@/store/settings";
import { Themes } from "@/config/themes";


export const NavBar: React.FC = () => {
  const { t } = useTranslation(`common`);

  const settings = useStore($settings);

  const hanldeChangeTheme = React.useCallback((value: boolean) => {
    if (value) {
      updateSettingsStore(
        settings.slippage,
        settings.blocks,
        Themes.Dark
      );
    } else {
      updateSettingsStore(
        settings.slippage,
        settings.blocks,
        Themes.Light
      );
    }
  }, [settings]);

  React.useEffect(() => {
    updateFromStorage();
  }, []);

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
      <div className={styles.buttons}>
        <ConnectZIlPay />
        <Toggle
          value={settings.theme === Themes.Dark}
          onToggle={hanldeChangeTheme}
        />
      </div>
    </nav>
  );
};
