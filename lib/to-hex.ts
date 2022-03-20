export function toHex(addr: string) {
  return String(addr).toLowerCase().replace('0x', '');
}
