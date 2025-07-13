import type { Film, Person, Planet } from "../types/swapi"
import axios from 'axios'

export const fetchFilms = async (): Promise<Film[]> => {
    const { data } = await axios.get('https://swapi.info/api/films')
   
    return data
}

export const fetchPeople = async (): Promise<Person[]> => {
    const { data } = await axios.get('https://swapi.info/api/people')
    return data
}

export const fetchPlanets = async (): Promise<Planet[]> => {
    const { data } = await axios.get('https://swapi.info/api/planets')
    return data
}