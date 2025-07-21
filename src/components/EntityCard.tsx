import styled from 'styled-components';
import { SafeImage } from './SafeImage';

const Card = styled.div`
  background: #111;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 2px 16px 0 rgba(60, 60, 120, 0.18);
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

const SubLabel = styled.div`
  color: #aaa;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

interface Entity {
  name: string;
  image?: string;
  model?: string;        
  population?: string;  
  [key: string]: any;   
}

interface EntityCardProps {
  entity: Entity;
}

export const EntityCard = ({ entity }: EntityCardProps) => {
  const { name, image, model, population } = entity;
  const sublabel =
    model?.length ? model :
    population?.length ? `Pop: ${population}` :
    null;
  return (
    <div style={{ cursor: 'pointer' }}>
      <Card>
        {image !== undefined && <Avatar src={image || '/fallback.jpg'} alt={name} />}
        <Name>{name}</Name>
        {sublabel && <SubLabel>{sublabel}</SubLabel>}
      </Card>
    </div>
  );
};
