import { useEffect } from "react"
import { fetchFilms } from "../api/swapi"

const Home = () => {

  useEffect(() => {
    fetchFilms()
  }, [])  
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Star Wars Explorer</h1>
    </main>
  )
}

export default Home