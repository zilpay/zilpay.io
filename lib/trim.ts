export function trim(str: string, length = 6) {
  if (!str) {
    return null;
  }

  const part0 = str.substr(0, length);
  const part1 = str.substr(length * -1);

  return `${part0}...${part1}`;
}
