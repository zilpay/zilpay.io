import { BLOCKS, NET, SLIPPAGE } from '@/config/conts';
import { StorageFields } from '@/config/storage-fields';
import { Themes } from '@/config/themes';
import { Store } from 'react-stores';
import cookieCutter from 'cookie-cutter';

const initState = {
  rate: 0.11858,
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

export function updateFromStorage() {
  try {
    const data = window.localStorage.getItem(StorageFields.Settings);
    const theme = cookieCutter.get('theme') || Themes.Dark;

    if (data) {
      $settings.setState({
        ...JSON.parse(data),
        theme
      });
    } else {
      $settings.setState({
        ...$settings.state,
        theme
      });
    }
    window.document.body.setAttribute('theme-color', $settings.state.theme);
  } catch {
    /////
  }
}
