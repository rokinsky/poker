import { cartesian, distinct, groupBy, zip } from "@/utils";

describe("distinct function", () => {
  test("1", () => {
    expect(distinct([])).toEqual([]);
  });

  test("2", () => {
    expect(distinct([1, 1, 1, 1])).toEqual([1]);
  });

  test("3", () => {
    expect(distinct([1, 2, 2])).toEqual([1, 2]);
  });
});

describe("zip function", () => {
  test("1", () => {
    expect(zip([], [])).toEqual([]);
  });

  test("1", () => {
    expect(zip([1], [3])).toEqual([[1, 3]]);
  });

  test("1", () => {
    expect(zip([1, 2], [3, 4])).toEqual([
      [1, 3],
      [2, 4],
    ]);
  });
});

describe("cartesian function", () => {
  test("1", () => {
    expect(cartesian([[1]], [[2]])).toEqual([[1, 2]]);
  });

  test("2", () => {
    expect(cartesian([[1], [2]], [[10], [20]], [[100], [200], [300]])).toEqual([
      [1, 10, 100],
      [1, 10, 200],
      [1, 10, 300],
      [1, 20, 100],
      [1, 20, 200],
      [1, 20, 300],
      [2, 10, 100],
      [2, 10, 200],
      [2, 10, 300],
      [2, 20, 100],
      [2, 20, 200],
      [2, 20, 300],
    ]);
  });

  test("3", () => {
    expect(cartesian([[1], [2], [3]], [[4], [5], [6]], [[7], [8]])).toEqual([
      [1, 4, 7],
      [1, 4, 8],
      [1, 5, 7],
      [1, 5, 8],
      [1, 6, 7],
      [1, 6, 8],
      [2, 4, 7],
      [2, 4, 8],
      [2, 5, 7],
      [2, 5, 8],
      [2, 6, 7],
      [2, 6, 8],
      [3, 4, 7],
      [3, 4, 8],
      [3, 5, 7],
      [3, 5, 8],
      [3, 6, 7],
      [3, 6, 8],
    ]);
  });
});

describe("groupBy function", () => {
  test("1", () => {
    const expected = new Map([
      [0, [0.4]],
      [1, [1.2, 1.1]],
      [2, [2.3]],
    ]);

    expect(groupBy([1.2, 1.1, 2.3, 0.4], Math.floor)).toEqual(expected);
  });

  test("2", () => {
    const expected = new Map([
      [3, ["one", "two"]],
      [5, ["three"]],
    ]);

    expect(groupBy(["one", "two", "three"], (el) => el.length)).toEqual(
      expected
    );
  });

  test("3", () => {
    enum Gender {
      Male,
      Female,
    }

    const expected = new Map([
      [Gender.Male, [{ g: Gender.Male, n: "A" }]],
      [
        Gender.Female,
        [
          { g: Gender.Female, n: "B" },
          { g: Gender.Female, n: "C" },
        ],
      ],
    ]);

    expect(
      groupBy(
        [
          { g: Gender.Male, n: "A" },
          { g: Gender.Female, n: "B" },
          { g: Gender.Female, n: "C" },
        ],
        (el) => el.g
      )
    ).toEqual(expected);
  });
});
