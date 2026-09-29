/**
 * Small helpers for working with the translation objects.
 * They are deliberately generic: nothing here knows about any language.
 */

type Plain = Record<string, unknown>;

function isPlainObject(value: unknown): value is Plain {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Overlay `override` on top of `base`.
 *
 * Used as the safety net for a half finished translation: anything the active
 * language is missing is taken from the fallback language instead of leaving
 * a hole on the screen. Arrays are replaced, never merged, because a
 * translation always supplies the whole list.
 */
export function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override === undefined ? base : override) as T;
  }

  const result: Plain = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const existing = result[key];
    result[key] =
      isPlainObject(existing) && isPlainObject(value) ? deepMerge(existing, value) : value;
  }
  return result as T;
}

/** Collect the dotted paths of every leaf value, in the order they are written. */
export function collectKeyPaths(value: unknown, prefix = ''): string[] {
  if (isPlainObject(value)) {
    const paths: string[] = [];
    for (const [key, child] of Object.entries(value)) {
      paths.push(...collectKeyPaths(child, prefix ? `${prefix}.${key}` : key));
    }
    return paths;
  }
  return [prefix];
}

/**
 * Keys of `reference` that `candidate` does not provide, and keys that it adds
 * but the reference does not know about.
 */
export function diffKeys(
  reference: unknown,
  candidate: unknown
): {
  missing: string[];
  extra: string[];
  empty: string[];
} {
  const referencePaths = new Set(collectKeyPaths(reference));
  const candidatePaths = collectKeyPaths(candidate);

  const missing: string[] = [];
  const extra: string[] = [];
  const empty: string[] = [];

  for (const path of referencePaths) {
    if (!candidatePaths.includes(path)) {
      missing.push(path);
    } else if (readPath(candidate, path).trim().length === 0) {
      empty.push(path);
    }
  }
  for (const path of candidatePaths) {
    if (!referencePaths.has(path)) {
      extra.push(path);
    }
  }

  return { missing, extra, empty };
}

/** Read a dotted path, returning undefined instead of throwing. */
export function readPath(source: unknown, path: string): string {
  let current: unknown = source;
  for (const key of path.split('.')) {
    if (!isPlainObject(current)) {
      return '';
    }
    current = current[key];
  }
  return typeof current === 'string' ? current : '';
}
