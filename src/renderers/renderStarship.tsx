import type { Starship } from '../types/swapi';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { DetailListItem } from '../components/DetailListItem';
import { SafeImage } from '../components/SafeImage';
import styled from 'styled-components';

type RelatedData = {
  pilots?: { name: string; id: string }[];
  films?: { name: string; id: string }[];
};

const StarshipTitle = styled.h1`
  margin-bottom: 40px;
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

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StarshipImage = styled(SafeImage)`
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

export const renderStarship = (starship: Starship, related: RelatedData) => {
  return (
    <Wrapper>
      <StarshipTitle>{starship.name}</StarshipTitle>

      <DetailListItem title="Model" singleItem={{ label: starship.model || 'Unknown' }} />
      <DetailListItem
        title="Manufacturer"
        singleItem={{ label: starship.manufacturer || 'Unknown' }}
      />
      <DetailListItem
        title="Starship Class"
        singleItem={{ label: capitalizeFirstLetter(starship.starship_class) }}
      />
      <DetailListItem
        title="Hyperdrive Rating"
        singleItem={{ label: starship.hyperdrive_rating || 'Unknown' }}
      />
      <DetailListItem title="Crew" singleItem={{ label: starship.crew || 'Unknown' }} />
      <DetailListItem title="Passengers" singleItem={{ label: starship.passengers || 'Unknown' }} />

      <DetailListItem
        title="Pilots"
        multiItems={
          Array.isArray(related.pilots) && related.pilots.length > 0
            ? related.pilots.map(p => ({ label: p.name, to: `/people/${p.id}` }))
            : [{ label: 'Unknown' }]
        }
      />

      <DetailListItem
        title="Films"
        multiItems={
          Array.isArray(related.films) && related.films.length > 0
            ? related.films.map(f => ({ label: f.name }))
            : [{ label: 'None' }]
        }
      />
    </Wrapper>
  );
};
