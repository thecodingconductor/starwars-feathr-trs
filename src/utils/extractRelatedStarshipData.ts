import type { Starship } from "../types/swapi";
import { extractIdFromUrl } from "./extractId";

type RelatedItem = {
  name: string;
  id: string;
  url: string;
};

type SWAPIEntity = {
  name?: string;
  title?: string;
};
// The extract Related ENTITY Data functions are needed to display info / and names of related data, like the Pilots for Starships, or the Planets, etc. API only returns a url. 
export const extractRelatedStarshipData = async (starship: Starship) => {
  const result: Record<string, RelatedItem[]> = {
    pilots: [],
    films: [],
  };

  try {
    if (starship.pilots?.length) {
      const pilotData = await Promise.all(
        starship.pilots.map(async (url) => {
          const id = extractIdFromUrl(url);
          if (!id) return null;

          try {
            const res = await fetch(url);
            const data: unknown = await res.json();
            if (typeof data === "object" && data !== null) {
              const entity = data as SWAPIEntity;
              return {
                name: entity.name || entity.title || "Unknown",
                id,
                url,
              };
            }
          } catch {
            //  continue to fallback below
          }

          return {
            name: "Unknown",
            id,
            url,
          };
        }),
      );
      result.pilots = pilotData.filter(Boolean) as RelatedItem[];
    }

    if (starship.films?.length) {
      const filmData = await Promise.all(
        starship.films.map(async (url) => {
          const id = extractIdFromUrl(url);
          if (!id) return null;

          try {
            const res = await fetch(url);
            const data: unknown = await res.json();
            if (typeof data === "object" && data !== null) {
              const entity = data as SWAPIEntity;
              return {
                name: entity.title || "Unknown",
                id,
                url,
              };
            }
          } catch {
            // continue to fallback below
          }

          return {
            name: "Unknown",
            id,
            url,
          };
        }),
      );
      result.films = filmData.filter(Boolean) as RelatedItem[];
    }
  } catch (error) {
    console.error("Failed to fetch related starship data:", error);
  }

  return result;
};
