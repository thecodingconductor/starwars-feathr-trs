import { create } from 'zustand'
import type { FilmStore } from '../types/swapi'

export const useFilmStore = create<FilmStore>((set, get) => ({
    films: [],
    query: '',
    setFilms: (films) => set({ films }),
    setQuery: (q) => set({query: q}),
    filteredFilms: () => {
        const { films, query } = get();
        return films.filter(film => 
            film.title.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => a.episode_id - b.episode_id)
    },
    getFilmById: (id) => {
        const {films} = get();
        return films.find((f) => f.episode_id === Number(id))
    }
}))