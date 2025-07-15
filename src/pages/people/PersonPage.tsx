import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import type { Person } from '../../types/swapi'
import { usePersonStore } from '../../store/usePersonStore'


const PersonPage = () => {
  const { id } = useParams<{id: string}>();

  const getPersonById = usePersonStore((state) => state.getById)
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {

    if (!id) return;

    const localPerson = getPersonById(id);

    if(localPerson) {
      setPerson(localPerson)
    } else {
      axios.get(`https://swapi.info/api/people/${id}`)
        .then(res => {setPerson(res.data)})
        .catch((err) => console.error('Failed to fetch person', err))
    }
  }, [person, id])

  if (!person) return <p>Loading person data...</p>

  return (
    <div>
      <h1>{person.name}</h1>
      <ul>
        <li><strong>Birth Year:</strong> {person.birth_year}</li>
        <li><strong>Gender:</strong> {person.gender}</li>
        <li><strong>Height:</strong> {person.height} cm</li>
        <li><strong>Mass:</strong> {person.mass} kg</li>
        <li><strong>Hair Color:</strong> {person.hair_color}</li>
        <li><strong>Eye Color:</strong> {person.eye_color}</li>
        <li><strong>Homeworld:</strong> {person.homeworld}</li> 
        <li><strong>Species:</strong> {person.species.join(', ')}</li> 
      </ul>
    </div>
  )
}

export default PersonPage