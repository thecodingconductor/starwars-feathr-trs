import { create } from 'zustand'
import { extractIdFromUrl } from '../utils/extractId'

interface EntityWithUrl { 
    url: string;
    [key: string]: any;
}

interface EntityStore<T extends EntityWithUrl>{
    data: T[];
    query: string;
    setData: (items: T[]) => void;
    setQuery: (q: string) => void;
    filtered: () => T[];
    getById: (id: string | number) => T | undefined;
}

export function createEntityStore<T extends EntityWithUrl>(sortKey: keyof T) {
    return create<EntityStore<T>>((set, get) => ({
        data: [],
        query: '',
        setData: (items) => set({ data: items}),
        setQuery: (q) => set({query: q}),
        filtered: () => {
            const { data, query} = get();
            // filter by name or title
            return data
                .filter((item) => 
                String(item.name || item.title)
            .toLowerCase()
            .includes(query.toLowerCase())
            // sort by name or number
        ).sort((a,b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];


            // check for values
            if (aVal === undefined || bVal === undefined) return 0;

            // String? Sort by Name
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return aVal.localeCompare(bVal);
             }
            //  Number? Sort by number
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return aVal - bVal;
            }
        });
        },
        getById: (id) => {
            return get().data.find(
                (item) => extractIdFromUrl(item.url) === String(id)
            )
        }

    }))
}