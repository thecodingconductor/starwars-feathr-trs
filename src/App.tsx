import { Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { lightTheme, darkTheme } from './theme/theme';
// import GlobalStyle from './theme/global';
import Home from './pages/Home'
import FilmPage from './pages/films/FilmPage'
import PersonPage from './pages/people/PersonPage'
import './App.css'
import PlanetPage from './pages/planets/PlanetPage';
import StarshipPage from './pages/starships/StarshipPage';

function App() {

  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(prev => !prev)

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />}/>

          <Route path={'/people/:id'} element={<PersonPage />} />
          

          <Route path={'/films/:id'} element={<FilmPage />}/>
          <Route path={'/planets/:id'} element={<PlanetPage />}/>
           <Route path={'/starships/:id'} element={<StarshipPage />}/>
        </Routes>
      </Suspense>
    </ThemeProvider>
   
  )
}

export default App
