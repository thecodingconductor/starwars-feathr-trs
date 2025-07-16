import type { Starship } from "../types/swapi";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

export const renderStarship = (
    starship: Starship,
    related: Record<string, string[]>
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
        <li><strong>Pilots:</strong> {related.pilots?.join(', ') || 'None'}</li>
        <li><strong>Films:</strong> {related.films?.join(', ') || 'None'}</li>
        </ul>
    </div>
)
