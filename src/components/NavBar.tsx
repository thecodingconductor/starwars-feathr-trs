import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

interface NavBarProps {
  hidden?: boolean;
}

const Nav = styled.nav<{ $hidden?: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem 2rem;
  color: white;
  align-items: center;
  background-color: transparent;
  z-index: 999;
  transition: transform 0.3s ease;
  transform: ${({ $hidden }) =>
    $hidden ? "translateY(-100%)" : "translateY(0)"};

  @media (min-width: 768px) {
    justify-content: flex-start;
    padding: 1rem 115px;
  }
`;

const StyledLink = styled(Link)<{ $active?: boolean }>`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-family: ${({ theme }) => theme.headingFont};

  ${({ $active }) =>
    $active &&
    css`
      text-shadow: 0px 4px 28px #91edff;
    `}

  &:hover {
    text-decoration: none;
  }
`;

const DesktopLinks = styled.div`
  display: flex;
  gap: 70px;
  @media (max-width: 700px) {
    display: none;
  }
`;

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
`;

const Overlay = styled(Dialog.Overlay)`
  background: rgba(0, 0, 0, 0.85);
  position: fixed;
  inset: 0;
  z-index: 1000;
`;

const MenuContent = styled(Dialog.Content)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  background: #111;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 1001;
`;

const CloseButton = styled(Dialog.Close)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

const NavBar = ({ hidden = false }: NavBarProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Nav $hidden={hidden}>
      <DesktopLinks>
        <StyledLink $active={currentPath === "/"} to="/">
          Home
        </StyledLink>
        <StyledLink $active={currentPath === "/planets"} to="/planets">
          Planets
        </StyledLink>
        <StyledLink $active={currentPath === "/starships"} to="/starships">
          Starships
        </StyledLink>
      </DesktopLinks>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <MobileMenuButton asChild>
          <button aria-label="Open menu">MENU</button>
        </MobileMenuButton>
        <Overlay />
        <MenuContent>
          <CloseButton aria-label="Close menu">&times;</CloseButton>
          <StyledLink to="/" onClick={() => setOpen(false)}>
            Home
          </StyledLink>
          <StyledLink to="/planets" onClick={() => setOpen(false)}>
            Planets
          </StyledLink>
          <StyledLink to="/starships" onClick={() => setOpen(false)}>
            Starships
          </StyledLink>
        </MenuContent>
      </Dialog.Root>
    </Nav>
  );
};

export default NavBar;
