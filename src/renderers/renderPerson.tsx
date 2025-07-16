import type { Person } from '../types/swapi'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'
import { Link } from 'react-router-dom'
import { extractIdFromUrl } from '../utils/extractId'


type RelatedData = {
  homeworld?: { name: string; id: string }
  species?: { name: string; id: string }[]
  starships?: {name: string, id: string}[]
}

export const renderPerson = (
  person: Person,
  related: RelatedData
) => {

return (
  <div>
    <h1>{person.name}</h1>
    <ul>
      <li><strong>Birth Year:</strong> {person.birth_year}</li>
      <li><strong>Gender:</strong> {capitalizeFirstLetter(person.gender)}</li>
      <li>
        <Link to={`/planets/${related.homeworld?.id}`}>
          <strong>Homeworld:</strong> {related.homeworld?.name || "Unknown"}
        </Link>
        
      </li>
      <li>
          <strong>Species:</strong>{" "}
          {Array.isArray(related.species)
            ? related.species.map((s, i) => (
                <span key={s.id}>
                  {i > 0 && ", "}
                  {s.name}
                </span>
              ))
            : "Unknown"}
        </li>
        <li>
          
              <strong>Starships: </strong>{" "}
              {Array.isArray(related.starships)
                ? related.starships.map((s, i) => (
                  <Link to={`/starships/${s.id}`}>
                     <span key={s.id}>
                      {i > 0 && ", "}
                      {s.name}
                    </span>
                  </Link>
                   
                  ))
                : "Unknown"}
          
          
        </li>
    </ul>
  </div>
)
  

}
  
