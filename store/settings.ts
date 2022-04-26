import { BLOCKS, SLIPPAGE } from '@/config/conts';
import { StorageFields } from '@/config/storage-fields';
import { Themes } from '@/config/themes';
import { Store } from 'react-stores';
import cookieCutter from 'cookie-cutter';

const initState = {
  rate: Number(typeof window !== 'undefined' ? (window.__NEXT_DATA__.props.pageProps.rate || 0) : 0),
  slippage: SLIPPAGE,
  blocks: BLOCKS,
  theme: String(typeof window !== 'undefined' ? window.__NEXT_DATA__.props.theme : Themes.Dark)
};

export const $settings = new Store(initState);

export function updateSettingsStore(data: typeof initState) {
  $settings.setState(data);

  if (typeof window !== 'undefined') {
    cookieCutter.set('theme', data.theme, {
      path: '/'
    });

    window.document.body.setAttribute('theme-color', data.theme);
    window.localStorage.setItem(StorageFields.Settings, JSON.stringify($settings.state));
  }
}

export function updateRate(rate: number) {
  initState.rate = rate;
  $settings.setState({
    ...$settings.state,
    rate
  });
}

export function updateFromStorage() {
  try {
    const data = window.localStorage.getItem(StorageFields.Settings);
    const theme = cookieCutter.get('theme') || Themes.Dark;

    if (data) {
      $settings.setState({
        ...JSON.parse(data),
        theme,
        rate: initState.rate
      });
    } else {
      $settings.setState({
        ...$settings.state,
        theme,
        rate: initState.rate
      });
    }
    window.document.body.setAttribute('theme-color', $settings.state.theme);
  } catch {
    /////
  }
}
