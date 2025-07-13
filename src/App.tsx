import { Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { lightTheme, darkTheme } from './theme/theme';
import GlobalStyle from './theme/global';
import Home from './pages/Home'
import './App.css'

function App() {

  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(prev => !prev)

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </Suspense>
    </ThemeProvider>
   
  )
}

export default App
