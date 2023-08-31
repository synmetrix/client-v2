import { customAlphabet } from "nanoid";

const genName = (entropy: number): string =>
  customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", entropy)();

export default genName;
