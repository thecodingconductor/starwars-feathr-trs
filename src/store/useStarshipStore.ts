import type { Starship } from "../types/swapi";
import { createEntityStore } from "./createEntityStore";

export const useStarshipStore = createEntityStore<Starship>('name')

