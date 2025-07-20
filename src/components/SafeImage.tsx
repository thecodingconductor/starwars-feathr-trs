import styled from 'styled-components';
import { useState } from 'react';

const StyledImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
`;

const fallback = '/fallback.jpg';

export const SafeImage = ({ src, alt }: { src: string; alt: string }) => {
  const [error, setError] = useState(false);

  return (
    <StyledImg
      src={error ? fallback : src}
      alt={alt}
      onError={() => setError(true)}
    />
  );
};