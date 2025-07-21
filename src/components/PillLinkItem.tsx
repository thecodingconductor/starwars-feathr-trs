import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PillLinkItem = styled(Link)`
  display: flex;
  padding: 20px 30px;
  flex-direction: column;
  border-radius: 40px;
  background: rgba(207, 65, 119, 0.5);
  gap: 12px;
  text-decoration: none;
  color: inherit;
  margin-bottom: 20px;

  p {
    margin: 0;
  }

  &:hover {
    border-color: #cf4177;
    transform: scale(1.02);
    transition:
      transform 0.2s ease,
      border-color 0.2s ease;
  }
`;
