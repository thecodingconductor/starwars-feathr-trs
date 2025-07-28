import axios from "axios";
import type { Film, Person, Planet, Starship } from "../types/swapi";

// Simple Api Fetching

const SWAPI_BASE = "https://swapi.info/api";
const IMAGE_BASE = "https://akabab.github.io/starwars-api/api/id";
const FALLBACK_IMAGE = "/fallback.jpg";

export const fetchFilms = async (): Promise<Film[]> => {
  const { data }: { data: Film[] } = await axios.get(`${SWAPI_BASE}/films`);
  return data;
};

export const fetchPeople = async (): Promise<Person[]> => {
  const { data }: { data: Person[] } = await axios.get(`${SWAPI_BASE}/people`);

  const withImageSrc: Person[] = await Promise.all(
    data.map(async (person) => {
      const id = person.url.split("/").filter(Boolean).pop();
      const personWithFallback = { ...person, image: FALLBACK_IMAGE };
      if (!id) return personWithFallback;

      try {
        const { data: imageData }: { data: { image: string } } =
          await axios.get(`${IMAGE_BASE}/${id}.json`);
        return { ...person, image: imageData.image };
      } catch {
        return personWithFallback;
      }
    }),
  );

  return withImageSrc;
};

export const fetchPerson = async (id: string): Promise<Person> => {
  const { data }: { data: Person } = await axios.get(
    `${SWAPI_BASE}/people/${id}`,
  );
  return data;
};

export const fetchPlanets = async (): Promise<Planet[]> => {
  const { data }: { data: Planet[] } = await axios.get(`${SWAPI_BASE}/planets`);
  return data;
};

export const fetchPlanet = async (id: string): Promise<Planet> => {
  const { data }: { data: Planet } = await axios.get(
    `${SWAPI_BASE}/planets/${id}`,
  );
  return data;
};

export const fetchStarships = async (): Promise<Starship[]> => {
  const { data }: { data: Starship[] } = await axios.get(
    `${SWAPI_BASE}/starships`,
  );
  return data;
};

export const fetchStarship = async (id: string): Promise<Starship> => {
  const { data }: { data: Starship } = await axios.get(
    `${SWAPI_BASE}/starships/${id}`,
  );
  return data;
};
