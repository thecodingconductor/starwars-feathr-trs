import { useEffect } from "react"
import { fetchPlanets } from "../../api/swapi"
import { usePlanetStore } from "../../store/usePlanetStore"
import { Link } from 'react-router-dom'
import { filterAndSort } from "../../utils/filterAndSort"

const Planets = () => {
  const data = usePlanetStore((s) => s.data)
  const query = usePlanetStore((s) => s.query)
  const setQuery = usePlanetStore((s) => s.setQuery)
  const setPlanets = usePlanetStore((s) => s.setData)

  const planets = filterAndSort(data, query, 'name')

  useEffect(() => {
    fetchPlanets().then(setPlanets)
  }, [])

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Star Wars Explorer Planets</h1>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search planets..." />
      <ul>
        {planets.map((planet) => (
          <Link key={planet.url} to={`/planets/${planet.url.split('/').at(-1)}`}>
            <div>{planet.name}</div>
          </Link>
        ))}
      </ul>
    </main>
  )
}

export default Planets