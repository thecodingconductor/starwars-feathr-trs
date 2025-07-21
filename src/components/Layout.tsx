import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './NavBar';
// import CursorLightsaber from './CursorLightsaber';

const Container = styled.div``;

const Layout = () => {
  return (
    <>
      <NavBar />
      <Container>
        {/* TODO: Outlet */}
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
