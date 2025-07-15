import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import type { Person } from '../../types/swapi'
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'
import { extractIdFromUrl } from '../../utils/extractId'
import { Link } from 'react-router-dom'
import { fetchPerson } from '../../api/swapi'

type HomeWorldObj = {
  name: string;
  id: number
}

const PersonPage = () => {
  const { id } = useParams<{id: string}>();

  const [person, setPerson] = useState<Person | null>(null);

  const [homeworldName, setHomeworldName] = useState<HomeWorldObj | null>(null)
  const [speciesName, setSpeciesName] = useState<string[]>([])
  // TODO: Get Image?
  // const [image, setImage] = useState<string | null>(null)


  useEffect(() => {

    // Fetch Person by ID 
    const fetchPerson = async () => {
      if(!id || person) return

      try {
        const res = await axios.get(`https://swapi.info/api/people/${id}`)
        setPerson(res.data)
      } catch (error) {
        console.error('Failed to fetch person:', error)
      }
    }
    
    fetchPerson()
  }, [person, id])

  useEffect(() => {

    // Fetch related data by Homeworld and Species URLs. 

    const fetchRelated = async () => {

      if(!person) return;

      try {
        if (person.homeworld) {
          const res = await axios.get(person.homeworld)
          setHomeworldName({
            name: res.data.name,
            id: Number(extractIdFromUrl(res.data.url))
          })

         
        }

        if (person.species && person.species.length > 0) {
          const names = await Promise.all(
            person.species.map(async (url) => {
              try {
                const res = await axios.get(url)
                return res.data.name
              } catch (error) {
                return 'Unknown'
              }
            })
          )

          setSpeciesName(names)
        } else {
          setSpeciesName(["Human"])
        }
      } catch (error) {
        console.error('Failed to fetch related data:', error)
      }
    }

    fetchRelated();

  }, [person])

  if (!person) return <p>Loading person data...</p>

  return (
    <div>
      <h1>{person.name}</h1>
      <ul>
        <li><strong>Birth Year:</strong> {person.birth_year}</li>
        <li><strong>Gender:</strong> {capitalizeFirstLetter(person.gender)}</li>
        <li><strong>Height:</strong> {person.height} cm</li>
        <li><strong>Mass:</strong> {person.mass} kg</li>
        {/* TODO: capitlize comma separated values */}
        <li><strong>Hair Color:</strong> {capitalizeFirstLetter(person.hair_color)}</li>
        <li><strong>Eye Color:</strong> {person.eye_color}</li>
        <li>
          <Link to={`/planets/${homeworldName?.id}`}>

               <strong>Homeworld:</strong> 
               {homeworldName?.name || 'Loading...'}
          </Link>
       
        </li> 
        <li><strong>Species:</strong> {speciesName.join(', ')}</li> 
      </ul>
    </div>
  )
}

export default PersonPage