import { SHARE_PERCENT, SHARE_PERCENT_DECIMALS } from "@/config/conts";


export function nPool(pool: bigint[], share: bigint) {
  const [x, y] = pool;

  return [
    Number(BigInt(x) * BigInt(share) / SHARE_PERCENT) / SHARE_PERCENT_DECIMALS,
    Number(BigInt(y) * BigInt(share) / SHARE_PERCENT) / SHARE_PERCENT_DECIMALS
  ];
}
