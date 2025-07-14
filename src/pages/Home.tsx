import { useEffect } from "react"
import { fetchFilms, fetchPeople } from "../api/swapi"
import { useFilmStore } from "../store/useFilmStore";
import { usePersonStore } from '../store/usePersonStore'
import { Link } from 'react-router-dom'
import { extractIdFromUrl } from "../utils/extractId";


const Home = () => {

 
  const { setPeople, query, setQuery, filteredPeople } = usePersonStore();

  useEffect(() => {
    // Fetch People on Page Load -> Load into Zustand State.
    fetchPeople().then(setPeople)
  }, []);


  
  
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Star Wars Explorer People</h1>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Use the force..."/>
      <ul>
        {filteredPeople().map(person => (    
            <li key={person.name}>
                <Link to={`/people/${extractIdFromUrl(person.url)}`}>
                    {person.name}
                </Link>  
            </li>     
        ))}
      </ul>
    </main>
  )
}

export default Home