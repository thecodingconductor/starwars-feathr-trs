import { create } from 'zustand'
import type { PersonStore } from '../types/swapi'
import { extractIdFromUrl } from '../utils/extractId';

export const usePersonStore = create<PersonStore>((set, get) => ({
    people: [],
    query: '',
    setPeople: (people) => set({ people }),
    setQuery: (q) => set({ query: q}),
    filteredPeople: () => {
        const { people, query } = get();
        return people.filter(person => 
                person.name.toLowerCase().includes(query.toLowerCase()))
                .sort((a, b) => a.name.localeCompare(b.name))
    },
    getPersonById: (id) => {
        const { people } = get();
        return people.find((p) => extractIdFromUrl(p.url) === String(id))
    }
}))