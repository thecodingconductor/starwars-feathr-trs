import { useEffect, useState } from "react"
import { fetchPeople } from "../api/swapi"
import { usePersonStore } from '../store/usePersonStore'
import { Link } from 'react-router-dom'
import { filterAndSort } from "../utils/filterAndSort";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: #111;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 0.75rem;
`;


const Name = styled.div`
  color: #eee;
  font-weight: bold;
  font-size: 1rem;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  background: #222;
  color: #fff;
  border: 1px solid #444;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Home = () => {

 const data = usePersonStore((s) => s.data);
 const query = usePersonStore((s) => s.query);
 const setQuery = usePersonStore((s) => s.setQuery) 
 const setPeople = usePersonStore((s) => s.setData);

 const people = filterAndSort(data, query, 'name');

  useEffect(() => {
    // Fetch People on Page Load -> Load into Zustand State.
    // call Zustand reset to remvoe query/
    usePersonStore.getState().reset();
    fetchPeople().then(setPeople)
  }, []);


  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(people.length / itemsPerPage);
  const paginated = people.slice((page - 1) * itemsPerPage, page * itemsPerPage);


  
  
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Star Wars Explorer People</h1>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Use the force..."/>
      <PaginationWrapper>
        <Button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>Previous</Button>
        <span style={{ color: '#fff', alignSelf: 'center' }}>
          Page {page} of {totalPages}
        </span>
        <Button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>Next</Button>
      </PaginationWrapper>
      <Grid>
        {paginated.map((person) => {
          const id = person.url.split('/').at(-1)
          return (
            <Link key={person.url} to={`/people/${id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <Avatar
                  src={person.image || "https://placehold.co/80x80?text=No+Image"}
                  alt={person.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/80x80?text=No+Image";
                  }}
                />
                <Name>{person.name}</Name>
              </Card>
            </Link>
          )
        })}
      </Grid>
      {/* <ul>
       {people.map((person) => {
        const id = person.url.split('/').at(-1);

        return (
          <Link key={person.url} to={`/people/${id}`}>
            <div>
              {person.image ? 
              (
                <>
                  <img
                    src={person.image || 'https://placehold.co/80x80?text=No+Image'}
                    alt={person.name}
                    style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%' }}
                  />
                  <div>{person.name}</div>
                </>
                  
              ) : (
                <>
                  <img
                    src={'https://placehold.co/80x80?text=No+Image'}
                    alt={person.name}
                    style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%' }}
                  />
                  <div>{person.name}</div>
                </>
              )}
          
        </div>
         </Link>
        )
       }
       
      )}
      </ul> */}
    </main>
  )
}

export default Home