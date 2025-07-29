import axios from "axios";
import type { Planet } from "../types/swapi";
import { extractIdFromUrl } from "./extractId";

type RelatedItem = {
  name: string;
  id: string;
  url: string;
};

type SWAPIEntity = {
  name?: string;
};

// The extract Related ENTITY Data functions are needed to display info / and names of related data, like the Pilots for Starships, or the Planets, etc. API only returns a url. 
export const extractRelatedPlanetData = async (
  planet: Planet,
): Promise<Record<"residents", RelatedItem[]>> => {
  const result: Record<"residents", RelatedItem[]> = {
    residents: [],
  };

  const fetchResident = async (url: string): Promise<RelatedItem | null> => {
    const id = extractIdFromUrl(url);
    if (!id) return null;

    try {
      const res = await axios.get(url);
      const data: unknown = res.data;

      if (typeof data === "object" && data !== null && "name" in data) {
        return {
          name: (data as SWAPIEntity).name ?? "Unknown",
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
  };

  try {
    const residents = await Promise.all(
      (planet.residents || []).map(fetchResident),
    );

    result.residents = residents.filter(Boolean) as RelatedItem[];
  } catch (error) {
    console.error("Failed to fetch related planet data:", error);
  }

  return result;
};
