import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  background: #222;
  color: #fff;
  border: 1px solid #444;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export const Pagination = ({ page, totalPages, onPrev, onNext }: PaginationProps) => (
  <PaginationWrapper>
    <Button onClick={onPrev} disabled={page === 1}>
      Previous
    </Button>
    <span style={{ color: '#fff', alignSelf: 'center' }}>
      Page {page} of {totalPages}
    </span>
    <Button onClick={onNext} disabled={page === totalPages}>
      Next
    </Button>
  </PaginationWrapper>
);
