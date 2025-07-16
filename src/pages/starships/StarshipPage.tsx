import EntityPage from "../EntityPage"
import { fetchStarship } from "../../api/swapi"
import { useStarshipStore } from "../../store/useStarshipStore"
import { extractRelatedStarshipData } from "../../utils/extractRelatedStarshipData"
import { renderStarship } from "../../renderers/renderStarship"

const StarshipPage = () => {
  return (
    <EntityPage
    fetchEntity={fetchStarship}
    getById={useStarshipStore.getState().getById}
    extractRelated={extractRelatedStarshipData}
    render={renderStarship}
  />
  )
}

export default StarshipPage