import styled from 'styled-components';
import { useState } from 'react';

const StyledImg = styled.img`
  object-fit: cover;
  border-radius: 50%;
  max-width: 100%;
  height: auto;
`;

const fallback = '/fallback.jpg';

export const SafeImage = ({ src, alt, className }: { src: string; alt: string, className?: string }) => {
  const [error, setError] = useState(false);

  return (
    <StyledImg
      className={className}
      src={error ? fallback : src}
      alt={alt}
      onError={() => setError(true)}
    />
  );
};