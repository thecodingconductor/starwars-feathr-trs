import { create } from "zustand";
import { persist } from "zustand/middleware";
import { extractIdFromUrl } from "../utils/extractId";

// This type extends each EntityType to include a url. 

interface EntityWithUrl {
  url: string;
  [key: string]: any;
}
// Interface for EntityStore.
interface EntityStore<T extends EntityWithUrl> {
  data: T[];
  query: string;
  setData: (items: T[]) => void;
  setQuery: (q: string) => void;
  filtered: () => T[];
  // To get detail pages.
  getById: (id: string | number) => T | undefined;
  // reset query on page reload.
  reset: () => void;
}

export function createEntityStore<T extends EntityWithUrl>(
  sortKey: keyof T,
  persistKey: string,
) {
  return create<EntityStore<T>>()(
    // Persist data to localStorage
    persist(
      (set, get) => ({
        data: [],
        query: "",
        setData: (items) => set({ data: items }),
        setQuery: (q) => set({ query: q }),
        filtered: () => {
          const { data, query } = get();
          return data
          // Filter data on search term
            .filter((item) =>
              String(item.name || item.title)
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            // sort based on sortKey
            .sort((a, b) => {
              const aVal = a[sortKey];
              const bVal = b[sortKey];
              if (aVal === undefined || bVal === undefined) return 0;
              if (typeof aVal === "string" && typeof bVal === "string") {
                return aVal.localeCompare(bVal);
              }
              if (typeof aVal === "number" && typeof bVal === "number") {
                return aVal - bVal;
              }
              return 0;
            });
        },
        getById: (id) => {
          return get().data.find(
            
            (item) => extractIdFromUrl(item.url) === String(id),
          );
        },
        reset: () => set({ query: "", data: [] }),
      }),
      // persist options.
      {
        name: persistKey,
      },
    ),
  );
}
