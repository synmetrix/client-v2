export default (pairs: [string, any][]) => {
  const result: any = {};
  let idx = 0;

  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];

    idx += 1;
  }

  return result;
};
