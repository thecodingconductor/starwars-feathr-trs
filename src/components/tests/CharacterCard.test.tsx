import { render, screen } from '@testing-library/react';
import { CharacterCard } from '../CharacterCard';

describe('CharacterCard', () => {
  const mockPerson = {
    url: 'https://swapi.dev/api/people/1/',
    name: 'Luke Skywalker',
    image: 'https://example.com/luke.jpg',
  };

  it('renders the character name', () => {
    render(<CharacterCard person={mockPerson} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('renders the character image with correct src and alt', () => {
    render(<CharacterCard person={mockPerson} />);
    const img = screen.getByRole('img', { name: /luke skywalker/i });
    expect(img).toHaveAttribute('src', mockPerson.image);
    expect(img).toHaveAttribute('alt', 'Luke Skywalker');
  });

  it('uses fallback image if none is provided', () => {
    const noImagePerson = { ...mockPerson, image: undefined };
    render(<CharacterCard person={noImagePerson} />);
    const img = screen.getByRole('img', { name: /luke skywalker/i });
    expect(img).toHaveAttribute('src', '/fallback.jpg');
  });
});
