import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./NavBar";
import CursorLightsaber from "./CursorLightsaber";

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`

const Layout = () => {
    return (
        <>
            <CursorLightsaber />
            <NavBar />
            <Container>
                {/* TODO: Outlet */}
                <Outlet />
            </Container>
        </>
    )
}

export default Layout