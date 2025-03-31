export function formatString(str: string, len: number) {
  return str.length > len ? str.slice(0, len) + "..." : str;
}
