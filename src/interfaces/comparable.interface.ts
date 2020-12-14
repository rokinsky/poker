import { CompareResult } from "@/enums/compare-result.enum";

export interface Comparable<T> {
  compare(other: T): CompareResult;
}
