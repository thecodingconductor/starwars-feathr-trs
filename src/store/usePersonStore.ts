import { create } from 'zustand'
import type { Person } from '../types/swapi'
import { extractIdFromUrl } from '../utils/extractId';
import { createEntityStore } from './createEntityStore';

export const usePersonStore = createEntityStore<Person>('name')