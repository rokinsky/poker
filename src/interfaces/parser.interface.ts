export interface Parser<T> {
  check(line: string): boolean;
  parse(line: string): T;
}
