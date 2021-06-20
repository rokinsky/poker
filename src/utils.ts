import { CompareResult } from "@/enums/compare-result.enum";
import { SortOrder } from "@/enums/sort-order.enum";
import { Comparable } from "@/interfaces/comparable.interface";

export const compare = <TVal, T extends Comparable<TVal>>(
  comparable: T,
  value: TVal
): CompareResult => {
  return comparable.compare(value);
};

export const compareWithLex = <TVal, T extends Comparable<TVal>>(
  comparable: T,
  value: TVal
): CompareResult => {
  const res = compare(comparable, value);
  return res === CompareResult.EQUAL
    ? comparePrimitives(`${comparable}`, `${value}`)
    : res;
};

export const max = <T extends Comparable<T>>(comparable: readonly T[]): T => {
  return comparable.reduce(
    (highest, val) =>
      val.compare(highest) === CompareResult.GREATER ? val : highest,
    comparable[0]
  );
};

export const distinct = <T>(xs: T[]): T[] => [...new Set(xs)];

export const groupBy = <T, K extends keyof T, R extends T[K]>(
  xs: readonly T[],
  predicate: (value: T) => R
): Map<R, T[]> => {
  return xs.reduce((acc, x) => {
    const key = predicate(x);
    acc.set(key, (acc.get(key) || []).concat(x));
    return acc;
  }, new Map<R, T[]>());
};

export const arrayEquals = <T>(a: readonly T[], b: readonly T[]) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

export const sort = <T extends Comparable<T>>(
  xs: T[],
  ordering: SortOrder = SortOrder.ASC,
  compareFunc = compare
): T[] =>
  xs.sort((a, b) =>
    ordering === SortOrder.ASC ? compareFunc(a, b) : compareFunc(b, a)
  );

export const zip = <T>(a: readonly T[], b: readonly T[]): [T, T][] =>
  Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i], b[i]]);

export const stringify = <T extends Comparable<T>>(xs: T[]): string =>
  xs.reduce((memo, value, index, xs) => {
    if (index === 0) {
      return value.toString();
    }

    if (value.compare(xs[index - 1]) === CompareResult.EQUAL) {
      return `${memo}=${value}`;
    }

    return `${memo} ${value}`;
  }, "");

export const comparePrimitives = <T>(a: T, b: T): CompareResult => {
  // prettier-ignore
  return a > b ? CompareResult.GREATER
       : a < b ? CompareResult.LESS
       : CompareResult.EQUAL;
};

export const cartesian = <T>(...a: T[][][]): T[][] =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())), [[]]);

export const kCombinations = <T>(
  xs: readonly T[],
  k: number,
  acc: T[][] = [],
  t: T[] = []
): T[][] => {
  return xs.reduce((p, c, i, a) => {
    k > 1
      ? kCombinations(a.slice(i + 1), k - 1, p, [...t, c])
      : p.push([...t, c].slice(0));
    return p;
  }, acc);
};
