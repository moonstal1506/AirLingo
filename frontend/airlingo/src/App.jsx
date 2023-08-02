import styled from "@emotion/styled";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import routers from "./router";

function App() {
    useEffect(() => {
        window.onbeforeunload = function pushRefresh() {
            window.scrollTo(0, 0);
        };
    }, []);
    return (
        <MainContainer>
            <RouterProvider router={routers} />
        </MainContainer>
    );
}

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export default App;
