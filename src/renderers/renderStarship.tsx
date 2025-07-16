import type { Starship } from "../types/swapi";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { Link } from "react-router-dom";

type RelatedData = {
    pilots?: {name: string, id: string}[],
    films?: {name: string, id: string}[]
}

export const renderStarship = (
    starship: Starship,
    related: RelatedData
) => (

    <div>
        <h1>{starship.name}</h1>
        <ul>
        <li><strong>Model:</strong> {starship.model}</li>
        <li><strong>Manufacturer:</strong> {starship.manufacturer}</li>
        <li><strong>Starship Class:</strong> {capitalizeFirstLetter(starship.starship_class)}</li>
        <li><strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}</li>
        <li><strong>Crew:</strong> {starship.crew}</li>
        <li><strong>Passengers:</strong> {starship.passengers}</li>
        <li>
            <strong>Pilots: </strong> 

            {Array.isArray(related.pilots)
                ? related.pilots.map((s, i) => (
                  <Link key={s.id} to={`/people/${s.id}`}>
                        <span>
                            {i > 0 && ", "}
                            {s.name}
                        </span>
                  </Link>
                    
                )) : "Unknown"
            }
            
           
        </li>
        <li><strong>Films:</strong> {related.films?.join(', ') || 'None'}</li>
        </ul>
    </div>
)
