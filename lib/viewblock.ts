enum Methods {
  Address = `address`,
  Tx = `tx`,
}

const url = `https://viewblock.io/zilliqa`;

export function viewAddress(address: string) {
  return `${url}/${Methods.Address}/${address}`;
}

export function viewTransaction(hash: string) {
  return `${url}/${Methods.Tx}/${hash}`;
}

export function getIconURL(addr: string, theme = 'dark') {
  addr = (addr === 'zil1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq9yf6pz') ? 'ZIL' : addr;

  return `https://meta.viewblock.io/zilliqa.${addr}/logo?t=${theme}`;
}
