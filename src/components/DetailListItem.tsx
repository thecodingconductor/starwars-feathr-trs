import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ArrowIcon from '/arrow.svg';

const pillStyles = css`
  display: inline-flex;
  align-items: center;
  padding: 20px 30px;
  border-radius: 40px;
  font-weight: 500;
  font-family: ${({ theme }) => theme.headingFont};
  background: rgba(207, 65, 119, 0.5);
  color: inherit;
  text-decoration: underline;
  text-transform: uppercase;
`;

const Wrapper = styled.div`
  padding: 20px 30px;
  border-radius: 20px;
  border: 2px solid rgba(207, 65, 119, 0.5);
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.headingFont};
  margin-bottom: 0.5rem;
`;

const DescriptionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Description = styled.span`
  font-size: 1rem;
  font-family: ${({ theme }) => theme.headingFont};
  text-decoration: underline;
  text-transform: uppercase;
`;

const Arrow = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 8px;
`;

const PillGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Pill = styled.span`
  ${pillStyles}
`;

const PillLink = styled(Link)`
  ${pillStyles}

  &:hover {
    background: rgba(207, 65, 119, 0.1);
  }
`;

type SingleItem = {
  label: string;
  to?: string;
};

type DetailListItemProps = {
  title: string;
  singleItem?: SingleItem;
  multiItems?: SingleItem[];
};

export const DetailListItem = ({ title, singleItem, multiItems }: DetailListItemProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>

      {singleItem && (
        <DescriptionRow>
          {singleItem.to ? (
            <Link to={singleItem.to} style={{ display: 'flex', alignItems: 'center' }}>
              <Description>{singleItem.label}</Description>
              <Arrow src={ArrowIcon} alt="arrow" />
            </Link>
          ) : (
            <Description>{singleItem.label}</Description>
          )}
        </DescriptionRow>
      )}

      {multiItems && (
        <PillGroup>
          {multiItems.map((item, idx) =>
            item.to ? (
              <PillLink key={idx} to={item.to}>
                {item.label}
              </PillLink>
            ) : (
              <Pill as="span" key={idx}>
                {item.label}
              </Pill>
            )
          )}
        </PillGroup>
      )}
    </Wrapper>
  );
};
