export default function arrayFromIterator<T>(iter: Iterator<T>) {
  const list = [];
  let next;

  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}
