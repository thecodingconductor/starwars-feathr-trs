import { createEntityStore } from "../createEntityStore";
import { act } from "@testing-library/react";

interface TestEntity {
  url: string;
  name: string;
  rank: number;
}

describe("createEntityStore", () => {
  const useStore = createEntityStore<TestEntity>("rank", "test-store");
  const initialState = useStore.getState();

  const sampleData: TestEntity[] = [
    { url: "https://swapi.info/api/people/1", name: "Luke Skywalker", rank: 2 },
    { url: "https://swapi.info/api/people/2", name: "Leia Organa", rank: 1 },
  ];

  beforeEach(() => {
    act(() => {
      useStore.setState(initialState, true); // reset state
    });
  });

  it("sets data correctly", () => {
    act(() => useStore.getState().setData(sampleData));
    expect(useStore.getState().data).toEqual(sampleData);
  });

  it("filters by query", () => {
    act(() => {
      useStore.getState().setData(sampleData);
      useStore.getState().setQuery("leia");
    });

    const filtered = useStore.getState().filtered();
    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe("Leia Organa");
  });

  it("sorts by sortKey", () => {
    act(() => useStore.getState().setData(sampleData));
    const sorted = useStore.getState().filtered();
    expect(sorted.map((i: TestEntity) => i.rank)).toEqual([1, 2]);
  });

  it("gets by id from URL", () => {
    act(() => useStore.getState().setData(sampleData));
    const leia = useStore.getState().getById("2");
    expect(leia?.name).toBe("Leia Organa");
  });

  it("resets store state", () => {
    act(() => {
      useStore.getState().setData(sampleData);
      useStore.getState().setQuery("Luke");
    });

    useStore.getState().reset();

    expect(useStore.getState().data).toEqual([]);
    expect(useStore.getState().query).toBe("");
  });
});
