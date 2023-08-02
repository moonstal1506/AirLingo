import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Notfound from "./pages/Notfound";
import AuthLayout from "./Layout/AuthLayout";
import Header from "./components/header";
import NotAuthLayout from "./Layout/NotAuthLayout";
import { MatchHome, MatchQueue, MatchResult, MatchStandby } from "./pages/match";

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
        id: 1,
        path: "/test",
        label: "Test",
        element: <Home />,
        withAuth: true,
        headerExist: false,
        mustNotAuth: false,
    },
    {
        id: 2,
        path: "/matchhome",
        label: "MatchHome",
        element: <MatchHome />,
        withAuth: false,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 3,
        path: "/matchqueue",
        label: "MatchQueue",
        element: <MatchQueue />,
        withAuth: false,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 3,
        path: "/matchresult",
        label: "MatchResult",
        element: <MatchResult />,
        withAuth: false,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 3,
        path: "/matchStandby",
        label: "MatchStandby",
        element: <MatchStandby />,
        withAuth: false,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 4,
        path: "*",
        label: "NotFound",
        element: <Notfound />,
        withAuth: false,
        headerExist: false,
        mustNotAuth: false,
    },
];

function seperatedHeaderCheckElement(router) {
    if (router.headerExist) {
        return (
            <>
                <Header />
                {router.element}
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
