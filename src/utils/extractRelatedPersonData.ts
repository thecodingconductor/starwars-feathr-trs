import type { Person } from '../types/swapi';
import { extractIdFromUrl } from './extractId';

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

const fetchRelatedItem = async (url: string, fallbackName = 'Unknown'): Promise<RelatedItem | null> => {
  const id = extractIdFromUrl(url);
  if (!id) return null;

  try {
    const res = await fetch(url);
    const data: unknown = await res.json();

    if (typeof data === 'object' && data !== null && 'name' in data) {
      return {
        name: (data as SWAPIEntity).name ?? fallbackName,
        url,
        id,
      };
    }
  } catch {
    // silently fall through to fallback
  }

  return {
    name: fallbackName,
    url,
    id,
  };
};

export const extractRelatedPersonData = async (
  person: Person
): Promise<RelatedPersonData | null> => {
  const result: RelatedPersonData = {
    species: [],
  };

  try {
    // Homeworld
    if (person.homeworld) {
      const homeworld = await fetchRelatedItem(person.homeworld);
      if (!homeworld) return null;
      result.homeworld = homeworld;
    }

    // Species
    if (person.species?.length > 0) {
      const speciesData = await Promise.all(
        person.species.map(url => fetchRelatedItem(url))
      );
      result.species = speciesData.filter((item): item is RelatedItem => item !== null);
    } else {
      result.species = [
        {
          name: 'Human',
          id: '1',
          url: 'https://swapi.info/api/species/1/',
        },
      ];
    }

    // Starships
    if (person.starships?.length > 0) {
      const starshipData = await Promise.all(
        person.starships.map(url => fetchRelatedItem(url))
      );
      result.starships = starshipData.filter((item): item is RelatedItem => item !== null);
    }
  } catch (err) {
    console.error('Failed to fetch related person data:', err);
    return null;
  }

  return result;
};
