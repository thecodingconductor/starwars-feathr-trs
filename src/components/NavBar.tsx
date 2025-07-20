import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem 2rem;
  color: white;
  align-items: center;
  background-color: transparent;
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-family: ${({ theme }) => theme.headingFont};

  &:hover {
    text-decoration: underline;
  }
`

const DesktopLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  @media (max-width: 700px) {
    display: none;
  }
`

const MobileMenuButton = styled(Dialog.Trigger)`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.headingFont};
  cursor: pointer;
  @media (max-width: 700px) {
    display: block;
    margin: 0 auto;
  }
`


const Overlay = styled(Dialog.Overlay)`
  background: rgba(0,0,0,0.85);
  position: fixed;
  inset: 0;
  z-index: 1000;
`

const MenuContent = styled(Dialog.Content)`
  position: fixed;
  inset: 0;
  background: #111;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 1001;
`

const CloseButton = styled(Dialog.Close)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`

const NavBar = () => {
  const [open, setOpen] = useState(false)
  return (
    <Nav>
      <DesktopLinks>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/planets">Planets</StyledLink>
        <StyledLink to="/starships">Starships</StyledLink>
        <StyledLink to="/people">People</StyledLink>
      </DesktopLinks>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <MobileMenuButton asChild>
          <button aria-label="Open menu">MENU</button>
        </MobileMenuButton>
        <Overlay />
        <MenuContent>
          <CloseButton aria-label="Close menu">&times;</CloseButton>
          <StyledLink to="/" onClick={() => setOpen(false)}>Home</StyledLink>
          <StyledLink to="/planets" onClick={() => setOpen(false)}>Planets</StyledLink>
          <StyledLink to="/starships" onClick={() => setOpen(false)}>Starships</StyledLink>
          <StyledLink to="/people" onClick={() => setOpen(false)}>People</StyledLink>
        </MenuContent>
      </Dialog.Root>
    </Nav>
  )
}

export default NavBar
