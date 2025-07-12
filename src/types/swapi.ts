// src/types/swapi.ts

export interface Film {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: string[]    
  planets: string[]       
  starships: string[]     
  vehicles: string[]     
  species: string[]      
  created: string       
  edited: string         
  url: string             
}


export interface FilmResponse {
  count: number
  next: string | null
  previous: string | null
  results: Film[]
}