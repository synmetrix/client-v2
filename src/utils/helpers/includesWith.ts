export default function includesWith<T>(
  pred: CallableFunction,
  x: T,
  list: T[]
) {
  let idx = 0;
  const len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}
