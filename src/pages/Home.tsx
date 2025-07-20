import { useEffect, useState } from "react"
import { fetchPeople } from "../api/swapi"
import { usePersonStore } from '../store/usePersonStore'
import { Link } from 'react-router-dom'
import { filterAndSort } from "../utils/filterAndSort";
import styled from "styled-components";
import { SafeImage } from "../components/SafeImage";
import { motion, AnimatePresence } from 'framer-motion';


const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const PageBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #71405A 0%, #35394A 79.33%, #3F4957 99.52%);
  padding: 1.5rem;
  padding-top: 60px;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
`;

const HeroContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    align-items: flex-start;
    text-align: left;
  }
`

const Logo = styled.img`
  width: 240px;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
   width: 560px;
  }

`;

const HeroTitle = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-family: ${({theme}) => theme.fontFamily}
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
  background-color: rgba(0, 0, 0, 0.65);

  &::placeholder {
    font-family: ${({theme}) => theme.headingFont};
    color: #fff;
  }
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

const PopularCharactersContainer = styled.div`
  background: linear-gradient(180deg, #323232 0%, #423635 51.92%);  
  
  border-radius: 12px;
  padding: 2rem 1rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    padding: 2.5rem;
  }
`;

const PopularCharactersTitle = styled.h2`
  text-align: center;
`

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const SearchResultsTitle = styled.h2`
  text-align: center;
  margin-top: 3rem;
  color: white;
  font-family: ${({ theme }) => theme.headingFont};
`;

const PopularContainer = styled.section`
  background-color: #2b2b2b;
  padding: 2rem 1rem;
  margin-top: 2rem;
  border-radius: 16px;
`;

const EmptyResults = styled.div`
  text-align: center;
  color: #aaa;
  margin-top: 2rem;
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

  const isSearching = query.length > 0;
  const popularCharacters = data.slice(0, 5); // show 5 by default

  return (
    <PageBackground>
      <AnimatePresence mode="wait">
        {!isSearching && (
          <motion.div
            key="hero"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Hero>
              <HeroContent>
                <Logo src="/logo-lockup.png" alt="Star Wars Explorer Logo" />
                <HeroTitle>
                  Welcome to this easily searchable database for hardcore Star Wars fans!
                </HeroTitle>
              </HeroContent>
            </Hero>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchWrapper>
        <SearchBar
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Use the force..."
        />
      </SearchWrapper>

      <AnimatePresence mode="wait">
        {isSearching ? (
          <motion.div
            key="results"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <SearchResultsTitle>SEARCH RESULTS</SearchResultsTitle>
            {people.length > 0 ? (
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
            ) : (
              <EmptyResults>No results found.</EmptyResults>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="popular"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <PopularContainer>
              <SearchResultsTitle>POPULAR CHARACTERS</SearchResultsTitle>
              <Grid>
                {popularCharacters.map((person) => {
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
            </PopularContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </PageBackground>
  );
};

export default HomePage;
