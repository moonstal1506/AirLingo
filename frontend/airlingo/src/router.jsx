import { createBrowserRouter } from "react-router-dom";
import styled from "@emotion/styled";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import AuthLayout from "./layout/AuthLayout";
import Header from "./components/header";
import NotAuthLayout from "./Layout/NotAuthLayout";

/* fix me! 페이지 추가에 따른 등록 필요! */
const routerData = [
    {
        id: 0,
        path: "/",
        label: "Home",
        element: <Home />,
        withAuth: false,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 0,
        path: "/test",
        label: "Home",
        element: <Home />,
        withAuth: true,
        headerExist: false,
        mustNotAuth: false,
    },
    {
        id: 1,
        path: "*",
        label: "NotFound",
        element: <Notfound />,
        withAuth: false,
        headerExist: false,
        mustNotAuth: false,
    },
];

function seperatedHeaderCheckElement(router) {
    const HeaderDownContainer = styled.div`
        padding-top: 120px;
        width: 100%;
        height: 100%;
    `;

    if (router.headerExist) {
        return (
            <>
                <Header />
                <HeaderDownContainer>{router.element}</HeaderDownContainer>
            </>
        );
    }
    return router.element;
}

const routers = createBrowserRouter(
    routerData.map((router) => {
        // 1. 로그인 해야만 접근이 가능한 경우
        if (router.withAuth) {
            return {
                path: router.path,
                element: <AuthLayout>{seperatedHeaderCheckElement(router)}</AuthLayout>,
            };
        }

        // 2. 로그인이 되지 않은 상태여야만 접근이 가능한 경우
        if (router.mustNotAuth) {
            return {
                path: router.path,
                element: <NotAuthLayout>{seperatedHeaderCheckElement(router)}</NotAuthLayout>,
            };
        }

        // 3. 공통적으로 그냥 접근해도 되는 경우
        return {
            path: router.path,
            element: seperatedHeaderCheckElement(router),
        };
    }),
);

export default routers;
