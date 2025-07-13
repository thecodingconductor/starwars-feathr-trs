import { useEffect } from "react"
import { fetchFilms } from "../api/swapi"
import { useFilmStore } from "../store/useFilmStore";
import { Link } from 'react-router-dom'


const Home = () => {

  const { setFilms, query, setQuery, filteredFilms } = useFilmStore();

  useEffect(() => {
    // Fetch Films on Page Load -> Load into Zustand State.
    fetchFilms().then(setFilms)
  }, []);


  
  
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Star Wars Explorer Films</h1>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Use the force..."/>
      <ul>
        {filteredFilms().map(film => (    
            <li key={film.episode_id}>
                <Link to={`/films/${film.episode_id}`}>
                    {film.title}
                </Link>  
            </li>     
        ))}
      </ul>
    </main>
  )
}

export default Home