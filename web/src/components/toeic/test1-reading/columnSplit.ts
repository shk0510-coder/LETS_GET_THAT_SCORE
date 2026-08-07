/**
 * Fill the left column top-to-bottom first, then the right column — same
 * rule as Listening Part 2's fixed layout, generalized since Reading pages
 * vary in question count. Left gets the extra item on an odd count.
 */
export function splitIntoColumns<T>(items: T[]): [T[], T[]] {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid), items.slice(mid)];
}
