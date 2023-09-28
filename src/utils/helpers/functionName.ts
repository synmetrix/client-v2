export default function functionName(f: () => any) {
  const match = String(f).match(/^function (\w*)/);
  return match == null ? "" : match[1];
}
