import { filterAndSort } from "../filterAndSort";

interface TestEntity {
  url: string;
  name?: string;
  title?: string;
  rank?: number;
}

const mockData: TestEntity[] = [
  { url: "/1", name: "Luke Skywalker" },
  { url: "/2", name: "Leia Organa" },
  { url: "/3", name: "Han Solo" },
  { url: "/4", name: "Obi-Wan Kenobi" },
];

describe("filterAndSort", () => {
  it("filters items by name (case-insensitive)", () => {
    const result = filterAndSort(mockData, "leia", "name");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Leia Organa");
  });

  it("sorts alphabetically by name", () => {
    const result = filterAndSort(mockData, "", "name");
    const names = result.map((item) => item.name);
    expect(names).toEqual([
      "Han Solo",
      "Leia Organa",
      "Luke Skywalker",
      "Obi-Wan Kenobi",
    ]);
  });

  it("handles numeric sorting", () => {
    const dataWithRanks: TestEntity[] = [
      { url: "/1", name: "A", rank: 3 },
      { url: "/2", name: "B", rank: 1 },
      { url: "/3", name: "C", rank: 2 },
    ];
    const result = filterAndSort(dataWithRanks, "", "rank");
    const ranks = result.map((item) => item.rank);
    expect(ranks).toEqual([1, 2, 3]);
  });

  it("ignores entries where sortKey is undefined", () => {
    const mixed = [
      { url: "/1", name: "A" },
      { url: "/2", name: "B", rank: 2 },
      { url: "/3", name: "C", rank: 1 },
    ];
    const result = filterAndSort(mixed, "", "rank");
    const ranks = result.map((i) => i.rank).filter(Boolean);
    expect(ranks).toEqual([1, 2]);
  });
});
