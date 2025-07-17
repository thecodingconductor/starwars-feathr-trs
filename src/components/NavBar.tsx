import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  padding: 1rem 2rem;
  background-color: #111;
  color: white;
  align-items: center;
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`

const NavBar = () => {
  return (
    <Nav>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/planets">Planets</StyledLink>
      <StyledLink to="/starships">Starships</StyledLink>
    </Nav>
  )
}

export default NavBar
