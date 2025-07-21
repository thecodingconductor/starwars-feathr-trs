import type { Person } from '../types/swapi';
import { createEntityStore } from './createEntityStore';

export const usePersonStore = createEntityStore<Person>('name', 'person-store');
