import { create } from 'zustand';
import type { FilmStore, Film } from '../types/swapi';
import { createEntityStore } from './createEntityStore';

export const useFilmStore = createEntityStore<Film>('episode_id');
