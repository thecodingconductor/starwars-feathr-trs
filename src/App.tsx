import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme/theme";
import GlobalStyle from "./theme/global";

import PersonPage from "./pages/people/PersonPage";
import PlanetPage from "./pages/planets/PlanetPage";
import StarshipPage from "./pages/starships/StarshipPage";
import Layout from "./components/Layout";

import { useModalStore } from "./store/useModalStore";
import { EntityModal } from "./components/EntityModal";
import SearchPage from "./pages/SearchPage";
import { fetchPeople, fetchPlanets, fetchStarships } from "./api/swapi";
import { usePersonStore } from "./store/usePersonStore";
import { usePlanetStore } from "./store/usePlanetStore";
import { useStarshipStore } from "./store/useStarshipStore";
import { ROUTES } from "./constants/routes";

import { EntityCard } from "./components/EntityCard";

function App() {
  const navigate = useNavigate();

  const location = useLocation();
  const backgroundLocation = useModalStore((s) => s.backgroundLocation);

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes location={backgroundLocation || location}>
          <Route element={<Layout />}>
            <Route
              path={ROUTES.HOME}
              element={
                <SearchPage
                  title="Popular Characters"
                  entityKey="people"
                  store={usePersonStore}
                  fetchFn={fetchPeople}
                  renderCard={(person) => <EntityCard entity={person} />}
                  baseUrl={ROUTES.PEOPLE}
                />
              }
            />

            <Route
              path={ROUTES.PLANETS}
              element={
                <SearchPage
                  title="Popular Planets"
                  entityKey="planets"
                  store={usePlanetStore}
                  fetchFn={fetchPlanets}
                  renderCard={(planet) => <EntityCard entity={planet} />}
                  baseUrl={ROUTES.PLANETS}
                />
              }
            />

            <Route
              path={ROUTES.STARSHIPS}
              element={
                <SearchPage
                  title="Popular Starships"
                  entityKey="starships"
                  store={useStarshipStore}
                  fetchFn={fetchStarships}
                  renderCard={(ship) => <EntityCard entity={ship} />}
                  baseUrl={ROUTES.STARSHIPS}
                />
              }
            />
          </Route>
        </Routes>

        {backgroundLocation && (
          <Routes>
            <Route
              path={`${ROUTES.PEOPLE}/:id`}
              element={
                <EntityModal
                  open
                  onOpenChange={(open) => {
                    if (!open) {
                      useModalStore.getState().clearBackgroundLocation();
                      void navigate(ROUTES.HOME);
                    }
                  }}
                >
                  <PersonPage />
                </EntityModal>
              }
            />

            <Route
              path={`${ROUTES.PLANETS}/:id`}
              element={
                <EntityModal
                  open
                  onOpenChange={(open) => {
                    if (!open) {
                      useModalStore.getState().clearBackgroundLocation();
                      void navigate(ROUTES.HOME);
                    }
                  }}
                >
                  <PlanetPage />
                </EntityModal>
              }
            />

            <Route
              path={`${ROUTES.STARSHIPS}/:id`}
              element={
                <EntityModal
                  open
                  onOpenChange={(open) => {
                    if (!open) {
                      useModalStore.getState().clearBackgroundLocation();
                      void navigate(ROUTES.HOME);
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
