import { usePersonStore } from "../../store/usePersonStore";
import { fetchPerson } from "../../api/swapi";
import { extractRelatedPersonData } from "../../utils/extractRelatedPersonData";
import EntityPage from "../EntityPage";
import { renderPerson } from "../../renderers/renderPerson";
import { useParams } from "react-router-dom";


// A wrapper around the Generic Entity Page.
// Using Component Composition. 
// Configures Entity Page, with fetchPerson to call SWAPI api with id. 
// usePersonStore.getState().getById to lookup the local Zustand store.
// extractRelatedPersonData will fetch and return related data not included in the Person type.
// renderPerson is our render function.
const PersonPage = () => {
  const { id } = useParams();
  if (!id) return null;
  return (
    <EntityPage
      id={id}
      fetchEntity={fetchPerson}
      getById={usePersonStore.getState().getById}
      extractRelated={extractRelatedPersonData}
      render={renderPerson}
    />
  );
};

export default PersonPage;
