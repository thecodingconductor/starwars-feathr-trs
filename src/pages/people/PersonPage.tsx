import { usePersonStore } from '../../store/usePersonStore'
import { fetchPerson } from '../../api/swapi'
import { extractRelatedPersonData } from '../../utils/extractRelatedPersonData'
import EntityPage from '../EntityPage'
import { renderPerson } from '../../renderers/renderPerson'
import { useParams } from 'react-router-dom'

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
  )
}

export default PersonPage
