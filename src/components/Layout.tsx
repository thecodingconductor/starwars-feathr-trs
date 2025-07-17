import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./NavBar";

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
`

const Layout = () => {
    return (
        <>
            <NavBar />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}

export default Layout