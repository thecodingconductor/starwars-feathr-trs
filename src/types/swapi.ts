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

// Zustand FilmStore Type.
export type FilmStore = {
  films: Film[];
  query: string;
  filteredFilms: () => Film[];
  setFilms: (films: Film[]) => void;
  setQuery: (q: string) => void;
  getFilmById: (id: string | number) => Film | undefined;
};

export interface Person {
  name: string;
  image: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export type PersonStore = {
  people: Person[];
  query: string;
  setPeople: (people: Person[]) => void;
  setQuery: (q: string) => void;
  filteredPeople: () => Person[];
  getPersonById: (id: string | number) => Person | undefined;
};


export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];  
  films: string[]; 
  url: string;
}

