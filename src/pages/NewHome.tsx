import { useState } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem;
  background: linear-gradient(180deg, #71405A 0%, #35394A 79.33%, #3F4957 99.52%);
  color: white;
  font-family: 'Inter', system-ui, sans-serif;
`;

const Logo = styled.img`
  width: 180px;
  margin: 0 auto 1rem;
  display: block;
`

const HeroText = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  max-width: 500px;
  margin: 0 auto 2rem;
  line-height: 1.4;
`

const SearchInput = styled.input`
  display: block;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
`

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 2rem;

  @media(min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`

const ResultCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  return (
    <PageWrapper>
      {query === '' && (
        <>
          <Logo src="/logo-lockup.png" alt="Star Wars Explorer" />
          <HeroText>
            Welcome to this easily searchable database for hardcore Star Wars fans!
          </HeroText>
        </>
      )}

      <SearchInput
        type="text"
        placeholder="Search the galaxy..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <ResultsGrid>
          {results.length === 0 ? (
            <p style={{ textAlign: 'center', width: '100%' }}>No results found.</p>
          ) : (
            results.map((item, i) => (
              <ResultCard key={i}>{item.name || item.title}</ResultCard>
            ))
          )}
        </ResultsGrid>
      )}
    </PageWrapper>
  );
};

export default HomePage;
