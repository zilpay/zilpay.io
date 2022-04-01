import "@/styles/components/_settings.scss";

import React from 'react';

// import { SwapSettingsModal } from '../modals/settings';


export const SwapSettings: React.FC = () => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <div
        className="settings"
        onClick={() => setShow(true)}
      >
        <svg width="22" height="27" viewBox="0 0 26 27" fill="none">
          <path
            d="M15.4267 26.8333H10.5734C9.94687 26.8333 9.40479 26.3973 9.27071 25.7853L8.72805 23.2733C8.00412 22.9561 7.31768 22.5595 6.68138 22.0906L4.23205 22.8706C3.63472 23.0611 2.98536 22.8097 2.67205 22.2666L0.240049 18.0653C-0.0698339 17.522 0.036927 16.8366 0.497382 16.4133L2.39738 14.68C2.31098 13.8948 2.31098 13.1025 2.39738 12.3173L0.497382 10.588C0.0362488 10.1644 -0.0705545 9.47825 0.240049 8.93463L2.66672 4.73063C2.98003 4.18756 3.62938 3.93614 4.22672 4.12663L6.67605 4.90663C7.00147 4.6655 7.34023 4.44292 7.69072 4.23996C8.02717 4.05022 8.37343 3.87842 8.72805 3.72529L9.27205 1.21596C9.40547 0.603918 9.94697 0.167285 10.5734 0.166626H15.4267C16.0531 0.167285 16.5946 0.603918 16.728 1.21596L17.2774 3.72663C17.6518 3.89131 18.0164 4.0774 18.3694 4.28396C18.6986 4.47438 19.0169 4.68315 19.3227 4.90929L21.7734 4.12929C22.3703 3.93952 23.0189 4.19084 23.332 4.73329L25.7587 8.93729C26.0686 9.48061 25.9618 10.166 25.5014 10.5893L23.6014 12.3226C23.6878 13.1078 23.6878 13.9001 23.6014 14.6853L25.5014 16.4186C25.9618 16.8419 26.0686 17.5273 25.7587 18.0706L23.332 22.2746C23.0189 22.8171 22.3703 23.0684 21.7734 22.8786L19.3227 22.0986C19.0126 22.327 18.6904 22.5384 18.3574 22.732C18.0078 22.9345 17.6473 23.1175 17.2774 23.28L16.728 25.7853C16.5941 26.3968 16.0527 26.8328 15.4267 26.8333ZM7.16005 19.1386L8.25338 19.9386C8.49985 20.1202 8.75673 20.2871 9.02272 20.4386C9.27298 20.5836 9.53067 20.7153 9.79471 20.8333L11.0387 21.3786L11.648 24.1666H14.3547L14.964 21.3773L16.208 20.832C16.7511 20.5925 17.2666 20.2947 17.7454 19.944L18.84 19.144L21.5614 20.0106L22.9147 17.6666L20.804 15.7426L20.9534 14.3933C21.019 13.8031 21.019 13.2075 20.9534 12.6173L20.804 11.268L22.916 9.33996L21.5614 6.99463L18.84 7.86129L17.7454 7.06129C17.2664 6.70891 16.751 6.40897 16.208 6.16663L14.964 5.62129L14.3547 2.83329H11.648L11.036 5.62263L9.79471 6.16663C9.53046 6.28268 9.27274 6.4131 9.02272 6.55729C8.75836 6.7084 8.50284 6.87444 8.25738 7.05463L7.16272 7.85463L4.44272 6.98796L3.08672 9.33996L5.19738 11.2613L5.04805 12.612C4.98245 13.2021 4.98245 13.7978 5.04805 14.388L5.19738 15.7373L3.08672 17.6613L4.44005 20.0053L7.16005 19.1386ZM12.9947 18.8333C10.0492 18.8333 7.66138 16.4455 7.66138 13.5C7.66138 10.5544 10.0492 8.16663 12.9947 8.16663C15.9402 8.16663 18.328 10.5544 18.328 13.5C18.3244 16.444 15.9387 18.8296 12.9947 18.8333ZM12.9947 10.8333C11.5379 10.8348 10.3519 12.0051 10.331 13.4617C10.3101 14.9184 11.4621 16.1222 12.9183 16.1655C14.3745 16.2087 15.5958 15.0753 15.6614 13.62V14.1533V13.5C15.6614 12.0272 14.4675 10.8333 12.9947 10.8333Z"
            fill="var(--text-color)"
          />
        </svg>
      </div>
      {/* <SwapSettingsModal
        show={show}
        onClose={() => setShow(false)}
      /> */}
    </>
  );
};
