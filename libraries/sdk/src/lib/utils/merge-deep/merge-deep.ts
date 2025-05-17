/* eslint-disable @typescript-eslint/no-explicit-any */
import { isObject } from '../is-object/is-object';

type Merge<T> = {
  [K in keyof T]: T[K] extends object ? Merge<T[K]> : T[K];
};

export function mergeDeep<T extends Record<string, any>>(target: T, source: Partial<T>): Merge<T> {
  if (!isObject(target) || !isObject(source)) {
    return (source ?? target) as Merge<T>;
  }

  const output: T = { ...target };
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetValue = target[key];
      const sourceValue = source[key];

      if (isObject(targetValue) && isObject(sourceValue)) {
        output[key] = mergeDeep(targetValue as Record<string, any>, sourceValue as Partial<Record<string, any>>) as T[typeof key];
      } else {
        output[key] = sourceValue as T[typeof key];
      }
    }
  }

  return output as Merge<T>;
}