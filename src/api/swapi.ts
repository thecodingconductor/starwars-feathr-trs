import type { Film } from "../types/swapi"
import axios from 'axios'

export const fetchFilms = async (): Promise<Film[]> => {
    const { data } = await axios.get('https://swapi.info/api/films')
    console.log(data)
    return data.results
}