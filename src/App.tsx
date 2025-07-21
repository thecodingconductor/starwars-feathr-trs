import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { lightTheme, darkTheme } from './theme/theme';
import GlobalStyle from './theme/global';
import Home from './pages/Home';
import FilmPage from './pages/films/FilmPage';
import PersonPage from './pages/people/PersonPage';
import PlanetPage from './pages/planets/PlanetPage';
import StarshipPage from './pages/starships/StarshipPage';
import Layout from './components/Layout';
import Planets from './pages/planets/Planets';
import Starships from './pages/starships/Starships';
import { useModalStore } from './store/useModalStore';
import { EntityModal } from './components/EntityModal';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = useModalStore(s => s.backgroundLocation);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes location={backgroundLocation || location}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path={'/people/:id'} element={<PersonPage />} />
            <Route path={'/films/:id'} element={<FilmPage />} />

            <Route path={'/planets'} element={<Planets />} />
            <Route path={'/planets/:id'} element={<PlanetPage />} />

            <Route path={'/starships'} element={<Starships />} />
            <Route path={'/starships/:id'} element={<StarshipPage />} />
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
                      navigate('/');
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
                      navigate('/');
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
                      navigate('/');
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
