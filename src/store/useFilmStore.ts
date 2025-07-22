import type { Film } from "../types/swapi";
import { createEntityStore } from "./createEntityStore";

export const useFilmStore = createEntityStore<Film>("episode_id", "film-store");
