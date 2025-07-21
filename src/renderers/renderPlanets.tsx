import type { Planet } from '../types/swapi';
import styled from 'styled-components';
import { DetailListItem } from '../components/DetailListItem';
import { SafeImage } from '../components/SafeImage';

type RelatedData = {
  residents?: { name: string; id: string }[];
};

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


const PlanetTitle = styled.h1`
  margin-bottom: 40px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlanetImage = styled(SafeImage)`
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

export const renderPlanet = (
  planet: Planet,
  related: RelatedData
) => {
  const { name, climate, terrain, gravity, population } = planet;

  return (
    <Wrapper>
      <PlanetTitle>{name}</PlanetTitle>

      {/* <ImageContainer>
        <PlanetImage src={planet.image} alt={planet.name} />
      </ImageContainer> */}

      <DetailListItem title="Climate" singleItem={{ label: climate || 'Unknown' }} />
      <DetailListItem title="Terrain" singleItem={{ label: terrain || 'Unknown' }} />
      <DetailListItem title="Gravity" singleItem={{ label: gravity || 'Unknown' }} />
      <DetailListItem title="Population" singleItem={{ label: population || 'Unknown' }} />

      <DetailListItem
        title="Residents"
        multiItems={
          Array.isArray(related.residents) && related.residents.length > 0
            ? related.residents.map((r) => ({ label: r.name, to: `/people/${r.id}` }))
            : [{ label: 'Unknown' }]
        }
      />
    </Wrapper>
  );
};
