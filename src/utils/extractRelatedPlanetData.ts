import axios from 'axios'
import type { Planet } from '../types/swapi'
import { extractIdFromUrl } from './extractId'

export const extractRelatedPlanetData = async (
  planet: Planet
): Promise<Record<string, any>> => {
  try {
    const residents = await Promise.all(
      (planet.residents || []).map(async (url) => {
        try {
          const res = await axios.get(url)
          return res.data.name
        } catch {
          return 'Unknown'
        }
      })
    )

    return {
      residents
    }
  } catch (error) {
    console.error("Failed to fetch related planet data:", error)
    return {}
  }
}
