import "@/styles/components/_new-pool.scss";

import type { TokenState } from '@/types/token';

import { useStore } from 'effector-react';
import React from 'react';

import { Text } from 'components/text';
import { TokensModal } from 'components/modals/tokens';

import { $pools } from '@/store/pools';


export const NewPool: React.FC = () => {
  const pools = useStore($pools);

  const [modal, setModal] = React.useState(false);
  const [token, setToken] = React.useState<TokenState>();

  const hanldeSelectToken = React.useCallback((token: TokenState) => {
    setToken(token);
    setModal(false);
  }, []);

  return (
    <>
      <div className="new-pool">
        <p>
          Pools Overview
        </p>
        <div className="wrapper">
          <Text>
            Your active liquidity positions will ppear here.
          </Text>
          <button onClick={() => setModal(true)}>
            New position
          </button>
        </div>
      </div>
      <TokensModal
        show={modal}
        pools={pools.slice(1)}
        onClose={() => setModal(false)}
        onSelect={hanldeSelectToken}
      />
    </>
  );
};