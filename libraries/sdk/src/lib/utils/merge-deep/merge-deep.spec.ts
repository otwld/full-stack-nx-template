/* eslint-disable @typescript-eslint/no-explicit-any */
import { mergeDeep } from "./merge-deep";

describe("mergeDeep", () => {
  test("should merge shallow objects", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    expect(mergeDeep(obj1, obj2)).toEqual({ a: 1, b: 3, c: 4 });
  });

  test("should handle arrays as values without deeply merging them", () => {
    const obj1 = { a: [1, 2, 3] };
    const obj2 = { a: [4, 5] };
    expect(mergeDeep(obj1, obj2)).toEqual({ a: [4, 5] });
  });

  test("should return source if target is not an object", () => {
    const obj1 = null as any;
    const obj2 = { a: 1 };
    expect(mergeDeep(obj1, obj2)).toEqual({ a: 1 });
  });

  test("should return target if source is undefined", () => {
    const obj1 = { a: 1 };
    const obj2 = undefined as any;
    expect(mergeDeep(obj1, obj2)).toEqual({ a: 1 });
  });
});
