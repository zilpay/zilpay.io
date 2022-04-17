import { BLOCKS, NET, SLIPPAGE } from '@/config/conts';
import { StorageFields } from '@/config/storage-fields';
import { Themes } from '@/config/themes';
import { Store } from 'react-stores';
import cookieCutter from 'cookie-cutter';

const initState = {
  slippage: SLIPPAGE,
  blocks: BLOCKS,
  theme: String(Themes.Dark)
};


export const $settings = new Store(initState);

export function updateSettingsStore(slippage: number, blocks: number, theme: Themes | string) {
  $settings.setState({
    slippage,
    blocks,
    theme
  });
  if (typeof window !== 'undefined') {
    cookieCutter.set('theme', theme);
    window.document.body.setAttribute('theme-color', theme);
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
    }
  } catch {
    /////
  }

  window.document.body.setAttribute('theme-color', $settings.state.theme);
}
