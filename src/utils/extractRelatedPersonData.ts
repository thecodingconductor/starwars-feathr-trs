import type { Person } from "../types/swapi";
import { extractIdFromUrl } from "./extractId";

type RelatedItem = {
  name: string;
  url: string;
  id: string;
};

type RelatedPersonData = {
  homeworld?: RelatedItem;
  species: RelatedItem[];
  starships?: RelatedItem[];
};

type SWAPIEntity = {
  name?: string;
};

// The extract Related ENTITY Data functions are needed to display info / and names of related data, like the Pilots for Starships, or the Planets, etc. API only returns a url. 
const fetchRelatedItem = async (
  url: string,
  fallbackName = "Unknown",
): Promise<RelatedItem> => {
  const id = extractIdFromUrl(url) ?? "unknown";

  try {
    const res = await fetch(url);
    const data: unknown = await res.json();

    if (typeof data === "object" && data !== null && "name" in data) {
      return {
        name: (data as SWAPIEntity).name ?? fallbackName,
        url,
        id,
      };
    }
  } catch {
    // Silent fallback
  }

  return {
    name: fallbackName,
    url,
    id,
  };
};

export const extractRelatedPersonData = async (
  person: Person,
): Promise<RelatedPersonData> => {
  const result: RelatedPersonData = {
    species: [],
  };

  try {
    // Homeworld
    if (person.homeworld) {
      result.homeworld = await fetchRelatedItem(person.homeworld);
    }

    // Species
    if (person.species?.length > 0) {
      const speciesData = await Promise.all(
        person.species.map((url) => fetchRelatedItem(url)),
      );
      result.species = speciesData;
    } else {
      result.species = [
        {
          name: "Human",
          id: "1",
          url: "https://swapi.info/api/species/1/",
        },
      ];
    }

    // Starships
    if (person.starships?.length > 0) {
      const starshipData = await Promise.all(
        person.starships.map((url) => fetchRelatedItem(url)),
      );
      result.starships = starshipData;
    }
  } catch (err) {
    console.error("Failed to fetch related person data:", err);
  }

  return result;
};
