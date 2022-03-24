export function chunk<T>(arr: T[], size: number): Array<T[]> {
  if (size <= 0) {
    throw new Error('Incorrect size');
  }

  const R = [];
  for (var i=0,len=arr.length; i<len; i+=size)
    R.push(arr.slice(i,i+size));
  return R;
}
