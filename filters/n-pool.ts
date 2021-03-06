import { SHARE_PERCENT } from "@/config/conts";


export function nPool(pool: string[], share: bigint) {
  const [x, y] = pool;

  return [
    (BigInt(x) * BigInt(share)) / SHARE_PERCENT,
    (BigInt(y) * BigInt(share)) / SHARE_PERCENT
  ];
}
