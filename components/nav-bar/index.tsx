import styles from "./index.module.scss";

import React from 'react';
import { useStore } from "react-stores";
import Link from 'next/link';
import Image from "next/image";

import { ConnectZIlPay } from "@/components/zilpay-connect";
import { Toggle } from "@/components/toggle";
import { $settings, updateSettingsStore } from "@/store/settings";
import { Themes } from "@/config/themes";


export const NavBar: React.FC = () => {
  const settings = useStore($settings);

  const hanldeChangeTheme = React.useCallback((value: boolean) => {
    if (value) {
      updateSettingsStore({
        ...settings,
        theme: Themes.Dark
      });
    } else {
      updateSettingsStore({
        ...settings,
        theme: Themes.Light
      });
    }
  }, [settings]);

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
