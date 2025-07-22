import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useModalStore } from '../store/useModalStore';
import { filterAndSort } from '../utils/filterAndSort';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavStore } from '../store/useNavStore';

import { Pagination } from '../components/Pagination';

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};


const floatMoon1 = keyframes`
  0%   { transform: translate(100%, 100%) scale(1); opacity: 0; }
  10%  { opacity: 0.3; }
  50%  { transform: translate(50%, 50%) scale(1.05); opacity: 0.5; }
  100% { transform: translate(-30%, -30%) scale(1.1); opacity: 0; }
`;

const floatMoon2 = keyframes`
 0%   { transform: translate(120%, 110%) scale(0.8); opacity: 0; }
  20%  { opacity: 0.3; }
  60%  { transform: translate(60%, 40%) scale(1); opacity: 0.5; }
  100% { transform: translate(-40%, -50%) scale(1.2); opacity: 0; }
`;

const Moon = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(2px);
  opacity: 0.5;
`;

const MoonOne = styled(Moon)`
  width: 80px;
  height: 80px;
  background-color: #ffcccc;
  top: 15%;
  left: 70%;
  animation: ${floatMoon1} 30s ease-in-out infinite;
`;

const MoonTwo = styled(Moon)`
  width: 100px;
  height: 100px;
  background-color: #ff4444;
  top: 50%;
  left: 85%;
  animation: ${floatMoon2} 40s ease-in-out infinite;
`;

const MoonsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0; // Send it behind main content
`;

const PageBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #71405a 0%, #35394a 79.33%, #3f4957 99.52%);
  padding: 1.5rem;
  padding-top: 60px;

  @media (min-width: 768px) {
    padding: 115px;
  }
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
`;

const Logo = styled.img`
  width: 240px;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    width: 560px;
  }
`;

const StyledLink = styled(Link)`
    &:hover {
        text-decoration: none;
    }
`

const HeroTitle = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.fontFamily}
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
  color: #fff;

  &::placeholder {
    font-family: ${({ theme }) => theme.headingFont};
    color: #fff;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 2rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(3, minmax(160px, 1fr));
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(5, minmax(160px, 1fr));
  }
`;

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


type SearchPageProps<T> = {
  title: string;
  entityKey: string;
  store: () => {
    data: T[];
    query: string;
    setQuery: (q: string) => void;
    setData: (d: T[]) => void;
    reset: () => void;
  };
  fetchFn: () => Promise<T[]>;
  renderCard: (item: T) => React.ReactNode;
  baseUrl: string;
};

function SearchPage<T>({ title, entityKey, store, fetchFn, renderCard, baseUrl }: SearchPageProps<T>) {

  const location = useLocation();
  const setLocationBackground = useModalStore(s => s.setBackgroundLocation);

 const { data, query, setQuery, setData, reset } = store();
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;
  const filtered = filterAndSort(data, query, 'name');
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const isSearching = query.length > 0;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const popular = data.slice(0, 5);


  const heroRef = useRef<HTMLDivElement | null>(null);
  const setNavHidden = useNavStore((s) => s.setNavHidden);    

  
 useEffect(() => {
  const checkOverlap = () => {
    const heroEl = heroRef.current;
    const navEl = document.querySelector('nav'); 

    if (!heroEl || !navEl) return;

    const heroRect = heroEl.getBoundingClientRect();
    const navRect = navEl.getBoundingClientRect();

    const isOverlapping = !(heroRect.bottom < navRect.top || heroRect.top > navRect.bottom);
    setNavHidden(isOverlapping);
  };

  window.addEventListener('scroll', checkOverlap);
  return () => window.removeEventListener('scroll', checkOverlap);
}, [setNavHidden]);

  useEffect(() => {
    reset();
    fetchFn().then(setData).catch(console.error);
  }, [fetchFn, setData, reset]);

  return (
    <PageBackground>
      <AnimatePresence mode="wait">
        {!isSearching && (
          <motion.div key="hero" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
            <Hero>
              <MoonsWrapper><MoonOne /><MoonTwo /></MoonsWrapper>
              <HeroContent ref={heroRef}>
                <Logo  src="/logo-lockup.png" />
                <HeroTitle>Welcome to this easily searchable database for hardcore Star Wars fans!</HeroTitle>
              </HeroContent>
            </Hero>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchWrapper>
        <SearchBar type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Use the force..." />
      </SearchWrapper>

      <AnimatePresence mode="wait">
        {isSearching ? (
          <motion.div key="results" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
            <SearchResultsTitle>SEARCH RESULTS</SearchResultsTitle>
            {filtered.length > 0 ? (
              <>
                <Pagination page={page} totalPages={totalPages} onPrev={() => setPage(p => p - 1)} onNext={() => setPage(p => p + 1)} />
                <Grid>
                  {paginated.map(item => (
                    <StyledLink key={(item as any).url} to={`${baseUrl}/${(item as any).url.split('/').at(-2)}`} onClick={() => setLocationBackground(location)}>
                      {renderCard(item)}
                    </StyledLink>
                  ))}
                </Grid>
              </>
            ) : <EmptyResults>No results found.</EmptyResults>}
          </motion.div>
        ) : (
          <motion.div key="popular" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
            <PopularContainer>
              <SearchResultsTitle>{title.toUpperCase()}</SearchResultsTitle>
              <Grid>
                {popular.map(item => (
                  <StyledLink key={(item as any).url} to={`${baseUrl}/${(item as any).url.split('/').at(-1)}`} onClick={() => setLocationBackground(location)}>
                  {renderCard(item)}
                  </StyledLink>
                ))}
              </Grid>
            </PopularContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </PageBackground>
  );
}


export default SearchPage