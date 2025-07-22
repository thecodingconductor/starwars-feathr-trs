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
  font-family: ${({ theme }) => theme.headingFont};

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const PageCounter = styled.span`
  color: #fff;
  align-self: center;
  font-family: ${({ theme }) => theme.headingFont};
`

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
    <PageCounter>
      Page {page} of {totalPages}
    </PageCounter>
    <Button onClick={onNext} disabled={page === totalPages}>
      Next
    </Button>
  </PaginationWrapper>
);
