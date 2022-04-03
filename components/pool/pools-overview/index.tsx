import styles from './index.module.scss';

import React from 'react';
import Link from 'next/link';


export const PoolOverview: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h3>
          Pools Overview
        </h3>
        <Link href="/pool/add" passHref>
          <button>
            + New pool
          </button>
        </Link>
      </div>
      <div className={styles.wrapper}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--muted-color)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
        </svg>
        <p>
          Your active liquidity positions will appear here.
        </p>
      </div>
    </div>
  );
};
