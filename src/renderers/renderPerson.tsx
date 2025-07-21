import type { Person } from '../types/swapi'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'
import { Link } from 'react-router-dom'
import { extractIdFromUrl } from '../utils/extractId'
import { SafeImage } from '../components/SafeImage'
import styled from 'styled-components'
import { DetailListItem } from '../components/DetailListItem'
import { PillLinkItem } from '../components/PillLinkItem'




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

const DataDescription = styled.p`
  color: #fff;
  font-family: ${({theme}) => theme.headingFont};
  text-decoration: underline;
  text-transform: uppercase;
`

const ArrowIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
  margin: 0 150px;
  align-items: flex-start;
  justify-content: flex-start;
  }
`;

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
  <Wrapper>
    <PersonTitle>{person.name}</PersonTitle>
    <ImageContainer>
      <Avatar src={person.image} alt={person.name} />
    </ImageContainer>
    <DetailListItem title="Birth Year" singleItem={{ label: person.birth_year }} />

    <DetailListItem title="Gender" singleItem={{ label: capitalizeFirstLetter(person.gender)}}/>

    <DetailListItem title="Homeworld" singleItem={{label : related.homeworld?.name || "Unknown", to: `/planets/${related.homeworld?.id}`}} />

    <DetailListItem
        title="Species"
        multiItems={Array.isArray(related.species) && related.species.length > 0
      ? related.species.map((s) => ({ label: s.name }))
      : [{ label: 'Unknown' }]}
      />

    <DetailListItem
      title="Starships"
      multiItems={Array.isArray(related.starships)
                ? related.starships.map((s, i) => ({ label: s.name, to: `/starships/${s.id}` }))
                : [{ label: 'Unknown'}]}
    />
      
  </Wrapper>
)
  

}
  
