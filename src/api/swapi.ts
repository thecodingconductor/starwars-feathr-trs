import type { Film, Person, Planet, Starship } from "../types/swapi"
import axios from 'axios'

// Simple API functions

export const fetchFilms = async (): Promise<Film[]> => {
    const { data } = await axios.get('https://swapi.info/api/films')
   
    return data
}

export const fetchPeople = async (): Promise<Person[]> => {
    const { data } = await axios.get('https://swapi.info/api/people')
    return data
}

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

export const fetchStarship = async (id: string): Promise<Starship> => {
    const { data } = await axios.get(`https://swapi.info/api/starships/${id}`);
    return data
}
