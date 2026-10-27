// Generic diff helpers for lists and JSON values.

/**
 * Ordered list diff based on the longest common subsequence. Falls back to a
 * multiset diff for very long lists.
 * @returns {{ removed: string[], added: string[] }}
 */
export const listDiff = (before = [], after = []) => {
  const a = before.map(String);
  const b = after.map(String);
  if (a.length * b.length > 6_000_000) return multisetDiff(a, b);

  const rows = a.length + 1;
  const cols = b.length + 1;
  const table = new Uint32Array(rows * cols);
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      table[i * cols + j] =
        a[i] === b[j]
          ? table[(i + 1) * cols + j + 1] + 1
          : Math.max(table[(i + 1) * cols + j], table[i * cols + j + 1]);
    }
  }
  const removed = [];
  const added = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
    } else if (table[(i + 1) * cols + j] >= table[i * cols + j + 1]) {
      removed.push(a[i++]);
    } else {
      added.push(b[j++]);
    }
  }
  removed.push(...a.slice(i));
  added.push(...b.slice(j));
  return { removed, added };
};

export const multisetDiff = (before = [], after = []) => {
  const counts = new Map();
  for (const item of before) counts.set(item, (counts.get(item) ?? 0) + 1);
  const added = [];
  for (const item of after) {
    const count = counts.get(item) ?? 0;
    if (count > 0) counts.set(item, count - 1);
    else added.push(item);
  }
  const removed = [];
  for (const [item, count] of counts) {
    for (let k = 0; k < count; k++) removed.push(item);
  }
  return { removed, added };
};

/** JSON.stringify with sorted object keys (stable comparison of JSON-LD). */
export const canonicalJson = (value) =>
  JSON.stringify(value, (_, inner) =>
    inner && typeof inner === 'object' && !Array.isArray(inner)
      ? Object.fromEntries(
          Object.keys(inner)
            .sort()
            .map((key) => [key, inner[key]]),
        )
      : inner,
  );
