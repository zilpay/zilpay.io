import "@/styles/components/nav-bar";

import React from 'react';
import Link from 'next/link';

import { ConnectZIlPay } from './zilpay/connect-zilpay';


export const Navbar: React.FC = () => (
  <div className="nav-bar">
    <Link href="/">
      <div className="logo">
        <img
          src="/icons/zilpay.svg"
          height="30"
          width-="30"
          alt="Logo"
        />
        <h3>
          ZilPay
        </h3>
      </div>
    </Link>
    <div className="container-center">
      <Link href="/swap">
        <h3>
          SWAP
        </h3>
      </Link>
      <Link href="/pool">
        <h3>
          POOL
        </h3>
      </Link>
    </div>
    <ConnectZIlPay />
  </div>
);
