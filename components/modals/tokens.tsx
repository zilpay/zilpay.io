import type { Pool, TokenState } from "@/types/token";

import React from "react";
import { useStore } from "effector-react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

import { Modal, ModalHeader } from "components/modal";
import { Text } from "components/text";
import { Colors } from "config/colors";
import { TokenCard } from "components/token-card";

import { $wallet } from "@/store/wallet";

type Prop = {
  show: boolean;
  pools: Pool[];
  onClose: () => void;
  onSelect: (token: TokenState) => void;
};

export var TokensModal: React.FC<Prop> = function ({
  show,
  pools = [],
  onClose,
  onSelect
}) {
  const common = useTranslation(`common`);
  const wallet = useStore($wallet);

  return (
    <Modal
      show={show}
      title={(
        <ModalHeader onClose={onClose}>
          {common.t(`account`)}
        </ModalHeader>
      )}
      width="450px"
      onClose={onClose}
    >
      {pools.map((pool) => (
        <TokenCard
          token={pool.meta}
          balance={pool.balance[wallet?.base16 || '']}
          key={pool.meta.bech32}
          onClick={onSelect}
        />
      ))}
    </Modal>
  );
};
