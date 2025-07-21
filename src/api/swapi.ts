import type { Film, Person, Planet, Starship } from "../types/swapi"
import axios, { AxiosError } from 'axios'

// Simple API functions

export const fetchFilms = async (): Promise<Film[]> => {
    const { data } = await axios.get('https://swapi.info/api/films')
   
    return data
}

export const fetchPeople = async (): Promise<Person[]> => {
  const { data } = await axios.get('https://swapi.info/api/people');

  const withImageSrc = await Promise.all(
    data.map(async (person: Person) => {
      const id = person.url.split('/').at(-1);

      try {
        const imgRes = await axios.get(`https://akabab.github.io/starwars-api/api/id/${id}.json`);
        const imageUrl = imgRes.data.image;

    

        return { ...person, image: imageUrl };
      } catch (err) {
        return { ...person, image: null };
      }
    })
  );

  return withImageSrc;
};


export const fetchPerson = async (id: string): Promise<Person> => {
    const { data } = await axios.get(`https://swapi.info/api/people/${id}`);
    return data

}

export const fetchPlanets = async (): Promise<Planet[]> => {
    const { data } = await axios.get('https://swapi.info/api/planets')
    
    return data
}

export const fetchPlanet = async (id: string): Promise<Planet> => {
    const { data } = await axios.get(`https://swapi.info/api/planets/${id}`)
    return data
}

export const fetchStarships = async (): Promise<Starship[]> => {
    const { data } = await axios.get(`https://swapi.info/api/starships`)
   
    return data
}

export const fetchStarship = async (id: string): Promise<Starship> => {
    const { data } = await axios.get(`https://swapi.info/api/starships/${id}`);
    return data
}
