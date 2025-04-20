/* eslint-disable @typescript-eslint/no-explicit-any */
export function isObject(value: unknown): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}