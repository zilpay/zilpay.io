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
