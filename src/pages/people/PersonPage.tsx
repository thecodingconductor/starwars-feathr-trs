import { usePersonStore } from '../../store/usePersonStore'
import { fetchPerson } from '../../api/swapi'
import { extractRelatedPersonData } from '../../utils/extractRelatedPersonData'
import EntityPage from '../EntityPage'
import { renderPerson } from '../../renderers/renderPerson'

const PersonPage = ({ id }: {id: string}) => {
 
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
