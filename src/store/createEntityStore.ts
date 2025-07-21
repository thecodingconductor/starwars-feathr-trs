import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { extractIdFromUrl } from '../utils/extractId';

interface EntityWithUrl {
  url: string;
  [key: string]: any;
}

interface EntityStore<T extends EntityWithUrl> {
  data: T[];
  query: string;
  setData: (items: T[]) => void;
  setQuery: (q: string) => void;
  filtered: () => T[];
  getById: (id: string | number) => T | undefined;
  reset: () => void;
}

export function createEntityStore<T extends EntityWithUrl>(sortKey: keyof T, persistKey: string) {
  return create<EntityStore<T>>()(
    persist(
      (set, get) => ({
        data: [],
        query: '',
        setData: items => set({ data: items }),
        setQuery: q => set({ query: q }),
        filtered: () => {
          const { data, query } = get();
          return data
            .filter(item =>
              String(item.name || item.title)
                .toLowerCase()
                .includes(query.toLowerCase())
            )
            .sort((a, b) => {
              const aVal = a[sortKey];
              const bVal = b[sortKey];
              if (aVal === undefined || bVal === undefined) return 0;
              if (typeof aVal === 'string' && typeof bVal === 'string') {
                return aVal.localeCompare(bVal);
              }
              if (typeof aVal === 'number' && typeof bVal === 'number') {
                return aVal - bVal;
              }
              return 0;
            });
        },
        getById: id => {
          return get().data.find(item => extractIdFromUrl(item.url) === String(id));
        },
        reset: () => set({ query: '', data: [] }),
      }),
      {
        name: persistKey, 
      }
    )
  );
}
