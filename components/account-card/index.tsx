import styles from "./index.module.scss";

import React from "react";
import copy from "clipboard-copy";
import { Wallet } from '@/types/wallet';

import { useTranslation } from "next-i18next";

import { CopyIcon } from "components/icons/copy";
import { ViewIcon } from "components/icons/view";

import { trim } from "@/lib/trim";
import { viewAddress } from "@/lib/viewblock";
import { useStore } from "react-stores";
import { $net } from "@/store/netwrok";


type Prop = {
  wallet: Wallet | null;
};

export var AccountCard: React.FC<Prop> = function ({ wallet }) {
  const common = useTranslation(`common`);

  const { net } = useStore($net);

  return (
    <div className={styles.container}>
      <p>
        {common.t(`connected_via`)}
        {` `}
        {net}
        .
      </p>
      <h4>
        {wallet ? trim(wallet.bech32, 15) : ``}
      </h4>
      <div className={styles.row}>
        <div className={styles.copy} onClick={() => copy(String(wallet?.bech32))}>
          <CopyIcon />
          <p>
            {common.t(`copy_adr`)}
          </p>
        </div>
        <a
          className={styles.second}
          href={wallet ? viewAddress(String(wallet?.bech32)) : ``}
          target="_blank"
        >
          <ViewIcon />
          <p>
            {common.t(`view_explorer`)}
          </p>
        </a>
      </div>
    </div>
  );
};
