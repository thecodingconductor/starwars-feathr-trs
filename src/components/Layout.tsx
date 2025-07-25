import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./NavBar";
import { useNavStore } from "../store/useNavStore";

const Container = styled.div``;

const Layout = () => {
  const navHidden = useNavStore((s) => s.navHidden);
  return (
    <>
      <NavBar hidden={navHidden} />

      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
