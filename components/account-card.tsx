import "@/styles/components/_account-card.scss";

import React from "react";
import copy from "clipboard-copy";
import { useStore } from "effector-react";
import { useTranslation } from "next-i18next";

import { Text } from "components/text";
import { CopyIcon } from "components/icons/copy";
import { ViewIcon } from "components/icons/view";

import { $net } from "store/wallet-netwrok";
import { StyleFonts } from "@/config/fonts";
import { trim } from "@/lib/trim";
import { viewAddress } from "@/lib/viewblock";
import { Wallet } from "@/store/wallet";


type Prop = {
  wallet: Wallet | null;
};

export var AccountCard: React.FC<Prop> = function ({ wallet }) {
  const common = useTranslation(`common`);
  const netwrok = useStore($net);

  return (
    <div className="account-card">
      <p>
        {common.t(`connected_via`)}
        {` `}
        {netwrok}
        .
      </p>
      <Text fontVariant={StyleFonts.Medium} size="20px">
        {wallet ? trim(wallet.bech32, 8) : ``}
      </Text>
      <div className="row">
        <div className="copy" onClick={() => copy(String(wallet?.bech32))}>
          <CopyIcon />
          <p>
            {common.t(`copy_adr`)}
          </p>
        </div>
        <a
          className="copy second"
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
