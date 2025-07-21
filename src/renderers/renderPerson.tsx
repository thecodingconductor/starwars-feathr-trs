import type { Person } from '../types/swapi'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'
import { Link } from 'react-router-dom'
import { extractIdFromUrl } from '../utils/extractId'
import { SafeImage } from '../components/SafeImage'
import styled from 'styled-components'

const Avatar = styled(SafeImage)`
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const PersonTitle = styled.h1`

  margin-bottom: 40px;

`


type RelatedData = {
  homeworld?: { name: string; id: string }
  species?: { name: string; id: string }[]
  starships?: {name: string, id: string}[]
}

export const renderPerson = (
  person: Person,
  related: RelatedData
) => {

return (
  <div>
    <PersonTitle>{person.name}</PersonTitle>
    <ImageContainer>
      <Avatar src={person.image} alt={person.name} />
    </ImageContainer>
    <ul>
      <li><strong>Birth Year:</strong> {person.birth_year}</li>
      <li><strong>Gender:</strong> {capitalizeFirstLetter(person.gender)}</li>
      <li>
        <Link to={`/planets/${related.homeworld?.id}`}>
          <strong>Homeworld:</strong> {related.homeworld?.name || "Unknown"}
        </Link>
        
      </li>
      <li>
          <strong>Species:</strong>{" "}
          {Array.isArray(related.species)
            ? related.species.map((s, i) => (
                <span key={s.id}>
                  {i > 0 && ", "}
                  {s.name}
                </span>
              ))
            : "Unknown"}
        </li>
        <li>
          
              <strong>Starships: </strong>{" "}
              {Array.isArray(related.starships)
                ? related.starships.map((s, i) => (
                  <Link key={s.id} to={`/starships/${s.id}`}>
                     <span >
                      {i > 0 && ", "}
                      {s.name}
                    </span>
                  </Link>
                   
                  ))
                : "Unknown"}
          
          
        </li>
    </ul>
  </div>
)
  

}
  
