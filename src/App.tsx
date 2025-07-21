import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './theme/theme';
import GlobalStyle from './theme/global';

import PersonPage from './pages/people/PersonPage';
import PlanetPage from './pages/planets/PlanetPage';
import StarshipPage from './pages/starships/StarshipPage';
import Layout from './components/Layout';

import { useModalStore } from './store/useModalStore';
import { EntityModal } from './components/EntityModal';
import SearchPage from './pages/SearchPage'; 
import { fetchPeople, fetchPlanets, fetchStarships } from './api/swapi'; 
import { usePersonStore } from './store/usePersonStore';
import { usePlanetStore } from './store/usePlanetStore';
import { useStarshipStore } from './store/useStarshipStore';

import { EntityCard }from './components/EntityCard'

// import PlanetCard from './components/cards/PlanetCard';
// import StarshipCard from './components/cards/StarshipCard';


function App() {

  const navigate = useNavigate();
 
  const location = useLocation();
  const backgroundLocation = useModalStore(s => s.backgroundLocation);

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes location={backgroundLocation || location}>
          <Route element={<Layout />}>
            <Route
                  path="/"
                  element={
                    <SearchPage
                      title="Popular Characters"
                      entityKey="people"
                      store={usePersonStore}
                      fetchFn={fetchPeople}
                      renderCard={(person) => <EntityCard entity={person} />}
                      baseUrl="/people"
                    />
                  }
                />

                <Route
                  path="/planets"
                  element={
                    <SearchPage
                      title="Popular Planets"
                      entityKey="planets"
                      store={usePlanetStore}
                      fetchFn={fetchPlanets}
                      renderCard={(planet) => <EntityCard entity={planet} />}
                      baseUrl="/planets"
                    />
                  }
                />

                <Route
                  path="/starships"
                  element={
                    <SearchPage
                      title="Popular Starships"
                      entityKey="starships"
                      store={useStarshipStore}
                      fetchFn={fetchStarships}
                      renderCard={(ship) => <EntityCard entity={ship} />}
                      baseUrl="/starships"
                    />
                  }
                />
           
          </Route>
        </Routes>

        {backgroundLocation && (
          <Routes>
            <Route
              path="/people/:id"
              element={
                <EntityModal
                  open
                  onOpenChange={open => {
                    if (!open) {
                      useModalStore.getState().clearBackgroundLocation();
                      void navigate('/');
                    }
                  }}
                >
                  <PersonPage />
                </EntityModal>
              }
            />

            <Route
              path="/planets/:id"
              element={
                <EntityModal
                  open
                  onOpenChange={open => {
                    if (!open) {
                      useModalStore.getState().clearBackgroundLocation();
                      void navigate('/');
                    }
                  }}
                >
                  <PlanetPage />
                </EntityModal>
              }
            />

            <Route
              path="/starships/:id"
              element={
                <EntityModal
                  open
                  onOpenChange={open => {
                    if (!open) {
                      useModalStore.getState().clearBackgroundLocation();
                      void navigate('/');
                    }
                  }}
                >
                  <StarshipPage />
                </EntityModal>
              }
            />
          </Routes>
        )}
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
