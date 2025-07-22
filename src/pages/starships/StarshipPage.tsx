import EntityPage from "../EntityPage";
import { fetchStarship } from "../../api/swapi";
import { useStarshipStore } from "../../store/useStarshipStore";
import { extractRelatedStarshipData } from "../../utils/extractRelatedStarshipData";
import { renderStarship } from "../../renderers/renderStarship";
import { useParams } from "react-router-dom";

const StarshipPage = () => {
  const { id } = useParams();
  if (!id) return null;
  return (
    <EntityPage
      id={id}
      fetchEntity={fetchStarship}
      getById={useStarshipStore.getState().getById}
      extractRelated={extractRelatedStarshipData}
      render={renderStarship}
    />
  );
};

export default StarshipPage;
