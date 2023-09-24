import { get } from "unchanged";

export default (
  keysArr: string[],
  curState: object,
  arrNotation: boolean = false
) =>
  keysArr.reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: get((arrNotation && [cur]) || cur, curState),
    }),
    {}
  );
