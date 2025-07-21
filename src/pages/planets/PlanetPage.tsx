import EntityPage from '../EntityPage'
import { fetchPlanet } from '../../api/swapi'
import { usePlanetStore } from '../../store/usePlanetStore'
import { extractRelatedPlanetData } from '../../utils/extractRelatedPlanetData'
import { renderPlanet } from '../../renderers/renderPlanets'
import { useParams } from 'react-router-dom'

const PlanetPage = () => {
  const { id } = useParams();
  if (!id) return null;
  return (
    <EntityPage
      id={id}
      fetchEntity={fetchPlanet}
      getById={usePlanetStore.getState().getById}
      extractRelated={extractRelatedPlanetData}
      render={renderPlanet}
    />
  )
}

export default PlanetPage
