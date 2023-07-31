import styled from "@emotion/styled";
import { RouterProvider } from "react-router-dom";
import routers from "./router";

function App() {
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
