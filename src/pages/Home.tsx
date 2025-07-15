import { useEffect } from "react"
import { fetchPeople } from "../api/swapi"
import { usePersonStore } from '../store/usePersonStore'
import { Link } from 'react-router-dom'
import { filterAndSort } from "../utils/filterAndSort";


const Home = () => {

 const data = usePersonStore((s) => s.data);
 const query = usePersonStore((s) => s.query);
 const setQuery = usePersonStore((s) => s.setQuery) 
 const setPeople = usePersonStore((s) => s.setData);

 const people = filterAndSort(data, query, 'name');

  useEffect(() => {
    // Fetch People on Page Load -> Load into Zustand State.
    fetchPeople().then(setPeople)
  }, []);



  
  
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Star Wars Explorer People</h1>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Use the force..."/>
      <ul>
       {people.map((person) => (
        <Link key={person.url} to={`/people/${person.url.split('/').at(-1)}`}>
          <div>{person.name}</div>
        </Link>
      ))}
      </ul>
    </main>
  )
}

export default Home