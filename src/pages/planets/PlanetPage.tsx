import EntityPage from '../EntityPage'
import { fetchPlanet } from '../../api/swapi'
import { usePlanetStore } from '../../store/usePlanetStore'
import { extractRelatedPlanetData } from '../../utils/extractRelatedPlanetData'
import { renderPlanet } from '../../renderers/renderPlanets'

const PlanetPage = () => {
  return (
    <EntityPage
      fetchEntity={fetchPlanet}
      getById={usePlanetStore.getState().getById}
      extractRelated={extractRelatedPlanetData}
      render={renderPlanet}
    />
  )
}

export default PlanetPage
