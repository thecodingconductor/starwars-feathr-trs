import type { Planet } from '../types/swapi'

export const renderPlanet = (
  planet: Planet,
  related: Record<string, string[]>
) => (
  <div>
    <h1>{planet.name}</h1>
    <ul>
      <li><strong>Climate:</strong> {planet.climate}</li>
      <li><strong>Terrain:</strong> {planet.terrain}</li>
      <li><strong>Gravity:</strong> {planet.gravity}</li>
      <li><strong>Population:</strong> {planet.population}</li>
      <li><strong>Residents:</strong> {related.residents?.join(', ') || 'None'}</li>
    </ul>
  </div>
)
