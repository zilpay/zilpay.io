import React from "react";
import copy from "clipboard-copy";
import { useStore } from "effector-react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

import { Text } from "components/text";
import { CopyIcon } from "components/icons/copy";
import { ViewIcon } from "components/icons/view";

import { Colors } from "config/colors";
import { $net } from "store/wallet-netwrok";
import { StyleFonts } from "@/config/fonts";
import { trim } from "@/lib/trim";
import { viewAddress } from "@/lib/viewblock";
import { Wallet } from "@/store/wallet";

const AccountContainer = styled.div`
  margin: 16px;
  padding: 5px 30px;

  border: 1px solid ${Colors.Secondary};
  border-radius: 16px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  .second {
    margin-left: 16px;
  }
`;
const CopyContainer = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: fit-content;

  user-select: none;

  :hover {
    svg {
      stroke: ${Colors.White};
    }
    div {
      color: ${Colors.White};
    }
  }
`;

type Prop = {
  wallet: Wallet | null;
};

export var AccountCard: React.FC<Prop> = function ({ wallet }) {
  const common = useTranslation(`common`);
  const netwrok = useStore($net);

  const netColor = React.useMemo(
    () => (netwrok === `mainnet` ? Colors.Muted : Colors.Danger),
    [netwrok],
  );

  return (
    <AccountContainer>
      <Text
        fontColors={netColor}
        fontVariant={StyleFonts.Regular}
        css="margin: 0;"
        size="16px"
      >
        {common.t(`connected_via`)}
        {` `}
        {netwrok}
        .
      </Text>
      <Text fontVariant={StyleFonts.Medium} size="20px">
        {wallet ? trim(wallet.bech32, 8) : ``}
      </Text>
      <Row>
        <CopyContainer onClick={() => copy(String(wallet?.bech32))}>
          <CopyIcon />
          <Text
            fontColors={Colors.Muted}
            fontVariant={StyleFonts.Regular}
            css="margin: 0;text-indent: 5px;"
            size="16px"
          >
            {common.t(`copy_adr`)}
          </Text>
        </CopyContainer>
        <CopyContainer
          className="second"
          href={wallet ? viewAddress(String(wallet?.bech32)) : ``}
          target="_blank"
        >
          <ViewIcon />
          <Text
            fontColors={Colors.Muted}
            fontVariant={StyleFonts.Regular}
            css="margin: 0;text-indent: 5px;"
            size="16px"
          >
            {common.t(`view_explorer`)}
          </Text>
        </CopyContainer>
      </Row>
    </AccountContainer>
  );
};
