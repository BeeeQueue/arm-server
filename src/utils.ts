export const isEmpty = <T extends Record<string, unknown> | Record<string, unknown>[]>(
  obj?: T | null | undefined,
): obj is T => {
  if (obj == null) return true

  if (Array.isArray(obj)) return obj.length === 0

  return Object.keys(obj).length === 0
}
