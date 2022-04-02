import styles from "./index.module.scss";

import type { Tx } from 'types/zilliqa';

import { Puff } from "react-loader-spinner";
import React from "react";
import { viewTransaction } from "lib/viewblock";

import { SuccessIcon } from "components/icons/success";
import { RejectIcon } from "components/icons/reject";

type Prop = {
  tx: Tx;
};

type StatusIconProp = {
  rejected?: boolean;
  loading: boolean;
};


const StatusIcon: React.FC<StatusIconProp> = function ({ rejected, loading }) {
  if (rejected && !loading) {
    return <RejectIcon />;
  }

  if (!rejected && !loading) {
    return <SuccessIcon />;
  }

  return <Puff
    color="var(--primary-color)"
    height={16}
    width={16}
  />;
};

export var TxCard: React.FC<Prop> = function ({ tx }) {
  return (
    <a
      className={styles.txcard}
      href={viewTransaction(tx.hash)}
      target="_blank"
    >
      <div className={styles.wrapper}>
        <p>
          {tx.name}
          {` `}
          ↗
        </p>
      </div>
      <StatusIcon
        rejected={tx.error}
        loading={!tx.confirmed}
      />
    </a>
  );
};
