export function isObjectEmpty<T extends object>(object: T) {
  return Boolean(!Object.keys(object).length);
}
