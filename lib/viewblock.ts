import { NET } from "@/config/conts";
import { $settings } from '@/store/settings';

enum Methods {
  Address = `address`,
  Tx = `tx`,
}

const url = `https://viewblock.io/zilliqa`;

export function viewAddress(address: string) {
  return `${url}/${Methods.Address}/${address}?network=${NET}`;
}

export function viewTransaction(hash: string) {
  return `${url}/${Methods.Tx}/${hash}?network=${NET}`;
}

export function getIconURL(addr: string) {
  const { theme } = $settings.state;
  addr = (addr === 'zil1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq9yf6pz') ? 'ZIL' : addr;

  return `https://meta.viewblock.io/zilliqa.${addr}/logo?t=${theme}`;
}
