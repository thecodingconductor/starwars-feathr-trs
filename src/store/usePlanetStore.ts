import type { Planet } from "../types/swapi";
import { createEntityStore } from "./createEntityStore";

export const usePlanetStore = createEntityStore<Planet>('name')

