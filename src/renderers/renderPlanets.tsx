import type { Planet } from '../types/swapi'
import { Link } from 'react-router-dom'

type RelatedData = {
  residents?: {name: string; id: string}[]
}

export const renderPlanet = (
  planet: Planet,
  related: RelatedData
) => (
  <div>
    <h1>{planet.name}</h1>
    <ul>
      <li><strong>Climate:</strong> {planet.climate}</li>
      <li><strong>Terrain:</strong> {planet.terrain}</li>
      <li><strong>Gravity:</strong> {planet.gravity}</li>
      <li><strong>Population:</strong> {planet.population}</li>
      <li>
        <strong>Residents: </strong> 

        {Array.isArray(related.residents) 
          ? related.residents.map((s, i) => (
            <Link key={s.id} to={`/people/${s.id}`}>
                    <span>
                      {i > 0 && ", "}
                      {s.name}
                      </span>
              </Link>
          )) : "Unknown"
        }
      </li>
    </ul>
  </div>
)
