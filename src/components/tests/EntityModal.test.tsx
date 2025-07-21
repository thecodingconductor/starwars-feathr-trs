import { render, screen, fireEvent } from '@testing-library/react';
import { EntityModal } from '../EntityModal';

describe('EntityModal', () => {
  it('renders children and close button when open', () => {
    const handleChange = jest.fn();

    render(
      <EntityModal open={true} onOpenChange={handleChange}>
        <p>Test content inside modal</p>
      </EntityModal>
    );

   
    expect(screen.getByText('Test content inside modal')).toBeInTheDocument();

  
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('calls onOpenChange(false) when close button is clicked', () => {
    const handleChange = jest.fn();

    render(
      <EntityModal open={true} onOpenChange={handleChange}>
        <p>Testing close action</p>
      </EntityModal>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(handleChange).toHaveBeenCalledWith(false);
  });
});
