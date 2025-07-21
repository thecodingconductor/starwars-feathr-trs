import { useEffect } from 'react';
import { fetchStarships } from '../../api/swapi';
import { useStarshipStore } from '../../store/useStarshipStore';
import { Link } from 'react-router-dom';
import { filterAndSort } from '../../utils/filterAndSort';

const Starships = () => {
  const data = useStarshipStore(s => s.data);
  const query = useStarshipStore(s => s.query);
  const setQuery = useStarshipStore(s => s.setQuery);
  const setStarships = useStarshipStore(s => s.setData);

  const starships = filterAndSort(data, query, 'name');

  useEffect(() => {
    fetchStarships().then(setStarships);
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Star Wars Explorer Starships</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search starships..."
      />
      <ul>
        {starships.map(ship => (
          <Link key={ship.url} to={`/starships/${ship.url.split('/').at(-1)}`}>
            <div>{ship.name}</div>
          </Link>
        ))}
      </ul>
    </main>
  );
};

export default Starships;
