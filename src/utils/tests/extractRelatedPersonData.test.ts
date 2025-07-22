import { extractRelatedPersonData } from '../../utils/extractRelatedPersonData';
import { Person } from '../../types/swapi';


global.fetch = jest.fn();

const mockFetch = fetch as jest.Mock;

describe('extractRelatedPersonData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('extracts homeworld, species, and starships data', async () => {
    const person: Person = {
        name: 'Luke Skywalker',
        url: 'https://swapi.info/api/people/1/',
        homeworld: 'https://swapi.info/api/planets/1/',
        species: ['https://swapi.info/api/species/1/'],
        starships: ['https://swapi.info/api/starships/12/'],
        birth_year: '19BBY',
        gender: 'male',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        films: [],
        vehicles: [],
        image: '', 
        created: '',
        edited: '',
        };

  
    mockFetch
      .mockResolvedValueOnce({
        json: async () => await Promise.resolve({ name: 'Tatooine' }),
      })
      .mockResolvedValueOnce({
        json: async () => await Promise.resolve({ name: 'Human' }),
      })
      .mockResolvedValueOnce({
        json: async () => await Promise.resolve({ name: 'X-Wing' }),
      });

    const result = await extractRelatedPersonData(person);

    expect(result).toEqual({
      homeworld: {
        name: 'Tatooine',
        url: 'https://swapi.info/api/planets/1/',
        id: '1',
      },
      species: [
        {
          name: 'Human',
          url: 'https://swapi.info/api/species/1/',
          id: '1',
        },
      ],
      starships: [
        {
          name: 'X-Wing',
          url: 'https://swapi.info/api/starships/12/',
          id: '12',
        },
      ],
    });

    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it('falls back to Human species if species is empty', async () => {
    const person: Person = {
        name: 'Han Solo',
        url: 'https://swapi.info/api/people/14/',
        homeworld: '',
        species: [],
        starships: [],
        birth_year: '29BBY',
        gender: 'male',
        height: '180',
        mass: '80',
        hair_color: 'brown',
        skin_color: 'light',
        eye_color: 'brown',
        films: [],
        vehicles: [],
        image: '',
        created: '',
        edited: '',
        };

    const result = await extractRelatedPersonData(person);

    expect(result.species).toEqual([{ name: 'Human', id: '1' }]);
  });
});
