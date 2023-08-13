import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        window.onbeforeunload = function pushRefresh() {
            window.scrollTo(0, 0);
        };
    }, []);
    return (
        <MainContainer>
            <Outlet />
        </MainContainer>
    );
}

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export default App;
