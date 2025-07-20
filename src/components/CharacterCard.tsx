import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SafeImage } from './SafeImage';

const Card = styled.div`
  background: #111;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 2px 16px 0 rgba(60,60,120,0.18);
  }
`;

const Avatar = styled(SafeImage)`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

const Name = styled.div`
  color: #eee;
  font-weight: bold;
  font-size: 1rem;
`;

interface CharacterCardProps {
  person: {
    url: string;
    name: string;
    image?: string;
  };
}

export const CharacterCard = ({ person }: CharacterCardProps) => {
  const id = person.url.split('/').at(-1);
  return (
    <Link to={`/people/${id}`} style={{ textDecoration: 'none' }}>
      <Card>
        <Avatar src={person.image || '/fallback.jpg'} alt={person.name} />
        <Name>{person.name}</Name>
      </Card>
    </Link>
  );
};