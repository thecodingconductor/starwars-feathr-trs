import type { Person } from "../types/swapi"
import { extractIdFromUrl } from "./extractId";

export const extractRelatedPersonData = async (person: Person) => {

      const result: Record<string, any> = {}

      try {
        if (person.homeworld) {
          const res = await fetch(person.homeworld)
          const data = await res.json();

          result.homeworld = {
            name: data.name,
            url: person.homeworld,
            id: extractIdFromUrl(person.homeworld)
          }
        }
        if (person.species?.length > 0) {
          const speciesNames = await Promise.all(
            person.species.map(async (url: string) => {
              const res = await fetch(url)
              const data = await res.json()

              return {
                name: data.name,
                url,
                id: extractIdFromUrl(url)
              }
            })
          )
          result.species = speciesNames
        } else {
          result.species = [{ name: "Human", id: "1" }]

        }
      } catch (err) {
        console.error(err)
      }
      return result
    }