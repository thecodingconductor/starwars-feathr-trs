import type { Starship } from '../types/swapi'
import { extractIdFromUrl } from './extractId'

type RelatedItem = {
  name: string
  id: string
  url: string
}

export const extractRelatedStarshipData = async (starship: Starship) => {
  const result: Record<string, RelatedItem[]> = {
    pilots: [],
    films: [],
  }

  try {
    if (starship.pilots?.length) {
      const pilotData = await Promise.all(
        starship.pilots.map(async (url) => {
          const id = extractIdFromUrl(url)
          if (!id) return null

          try {
            const res = await fetch(url)
            const data = await res.json()
            return {
              name: data.name || 'Unknown',
              id,
              url,
            }
          } catch {
            return {
              name: 'Unknown',
              id,
              url,
            }
          }
        })
      )
      result.pilots = pilotData.filter(Boolean) as RelatedItem[]
      console.log(result.pilots)
    }

    if (starship.films?.length) {
      const filmData = await Promise.all(
        starship.films.map(async (url) => {
          const id = extractIdFromUrl(url)
          if (!id) return null

          try {
            const res = await fetch(url)
            const data = await res.json()
            return {
              name: data.title || 'Unknown',
              id,
              url,
            }
          } catch {
            return {
              name: 'Unknown',
              id,
              url,
            }
          }
        })
      )
      result.films = filmData.filter(Boolean) as RelatedItem[]
    }

  } catch (error) {
    console.error('Failed to fetch related starship data:', error)
  }

  return result
}
