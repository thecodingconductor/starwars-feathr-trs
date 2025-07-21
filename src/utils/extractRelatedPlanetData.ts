import axios from 'axios';
import type { Planet } from '../types/swapi';
import { extractIdFromUrl } from './extractId';

type RelatedItem = {
  name: string;
  id: string;
  url: string;
};

export const extractRelatedPlanetData = async (planet: Planet): Promise<Record<string, any>> => {
  const result: Record<string, RelatedItem[]> = {
    residents: [],
  };

  try {
    const residents = await Promise.all(
      (planet.residents || []).map(async url => {
        const id = extractIdFromUrl(url);
        if (!id) return null;

        try {
          const res = await axios.get(url);
          return {
            name: res.data.name || 'Unknown',
            id,
            url,
          };
        } catch {
          return {
            name: 'Unknown',
            id,
            url,
          };
        }
      })
    );

    result.residents = residents.filter(Boolean) as RelatedItem[];
  } catch (error) {
    console.error('Failed to fetch related planet data:', error);
    return {};
  }

  return result;
};
