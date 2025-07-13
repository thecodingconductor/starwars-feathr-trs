import { create } from 'zustand'
import type { Film, FilmStore } from '../types/swapi'

export const useFilmStore = create<FilmStore>((set, get) => ({
    films: [],
    query: '',
    setFilms: (films) => set({ films }),
    setQuery: (q) => set({query: q}),
    filteredFilms: () => {
        const { films, query } = get();
        return films.filter(film => film.title.toLowerCase().includes(query.toLowerCase()))
    } 
}))