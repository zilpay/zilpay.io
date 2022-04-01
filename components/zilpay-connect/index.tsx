import styles from './index.module.scss';

import React from "react";

let observer = null;
let observerNet = null;
let observerBlock = null;
export const ConnectZIlPay: React.FC = function () {
  return (
    <button className={styles.connect}>
      Connect
    </button>
  );
};
