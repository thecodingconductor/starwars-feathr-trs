import { useEffect, useState } from "react"
import { fetchPeople } from "../api/swapi"
import { usePersonStore } from '../store/usePersonStore'
import { Link } from 'react-router-dom'
import { filterAndSort } from "../utils/filterAndSort";
import styled from "styled-components";
import { SafeImage } from "../components/SafeImage";

const PageBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #71405A 0%, #35394A 79.33%, #3F4957 99.52%);
  padding: 1.5rem;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
`;

const Logo = styled.img`
  width: 180px;
  margin-bottom: 1.5rem;
`;

const HeroTitle = styled.h1`
  color: white;
  font-size: 1.5rem;
  max-width: 360px;
  margin-bottom: 1.5rem;
`;

const SearchBar = styled.input`
  padding: 0.75rem 1.25rem;
  border-radius: 50px;
  border: none;
  font-size: 1rem;
  width: 100%;
  max-width: 320px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: #111;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
`;

const Avatar = styled(SafeImage)`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 0.5rem;
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

const HomePage = () => {
  const data = usePersonStore((s) => s.data);
  const query = usePersonStore((s) => s.query);
  const setQuery = usePersonStore((s) => s.setQuery);
  const setPeople = usePersonStore((s) => s.setData);

  const people = filterAndSort(data, query, 'name');

  useEffect(() => {
    usePersonStore.getState().reset();
    fetchPeople().then(setPeople);
  }, []);

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(people.length / itemsPerPage);
  const paginated = people.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const hideHero = query.length > 0;

  return (
    <PageBackground>
      {!hideHero && (
        <Hero>
          <Logo src="/logo-lockup.png" alt="Star Wars Explorer Logo" />
          <HeroTitle>Welcome to this easily searchable database for hardcore Star Wars fans!</HeroTitle>
        </Hero>
      )}
      <SearchBar
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search characters..."
      />

      {query.length > 0 && (
        <>
          <PaginationWrapper>
            <Button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
              Previous
            </Button>
            <span style={{ color: '#fff', alignSelf: 'center' }}>
              Page {page} of {totalPages}
            </span>
            <Button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
              Next
            </Button>
          </PaginationWrapper>

          <Grid>
            {paginated.map((person) => {
              const id = person.url.split('/').at(-1);
              return (
                <Link key={person.url} to={`/people/${id}`} style={{ textDecoration: 'none' }}>
                  <Card>
                    <Avatar src={person.image} alt={person.name} />
                    <Name>{person.name}</Name>
                  </Card>
                </Link>
              );
            })}
          </Grid>
        </>
      )}
    </PageBackground>
  );
};

export default HomePage;
