import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Notfound from "./pages/Notfound";
import AuthLayout from "./Layout/AuthLayout";
import Header from "./components/header";
import NotAuthLayout from "./Layout/NotAuthLayout";
import WordBook from "./pages/mypage/WordBook";
import Login from "./pages/login/Login";
import Script from "./pages/mypage/Script";
import SignUp from "./pages/signup";
import Meeting from "./pages/meeting/slide/MeetingDictionary";
import { MatchHome, MatchQueue, MatchResult, MatchStandby } from "./pages/match";
import { MyPageBook, BasicInfoHome, StatisticHome, StatisticGraph, ShopHome } from "./pages/mypage";

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
        withAuth: false,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 2,
        path: "/signup",
        label: "SignUp",
        element: <SignUp />,
        withAuth: false,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 3,
        path: "/login",
        label: "Login",
        element: <Login />,
        withAuth: false,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 4,
        path: "/matchhome",
        label: "MatchHome",
        element: <MatchHome />,
        withAuth: true,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 5,
        path: "/matchqueue",
        label: "MatchQueue",
        element: <MatchQueue />,
        withAuth: false,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 6,
        path: "/matchresult",
        label: "MatchResult",
        element: <MatchResult />,
        withAuth: false,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 7,
        path: "/matchstandby",
        label: "MatchStandby",
        element: <MatchStandby />,
        withAuth: false,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 8,
        path: "/meeting",
        label: "Meeting",
        element: <Meeting />,
        withAuth: true,
        headerExist: false,
        mustNotAuth: false,
    },
    {
        id: 9,
        path: "/mypage",
        label: "mypage",
        element: <MyPageBook />,
        withAuth: true,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 10,
        path: "/basicinfo",
        label: "basicinfo",
        element: <BasicInfoHome />,
        withAuth: true,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 11,
        path: "/statistic",
        label: "statistic",
        element: <StatisticHome />,
        withAuth: false,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 12,
        path: "/graph",
        label: "graph",
        element: <StatisticGraph />,
        withAuth: true,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 13,
        path: "/script",
        label: "Script",
        element: <Script />,
        withAuth: true,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 14,
        path: "/wordbook",
        label: "WordBook",
        element: <WordBook />,
        withAuth: true,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 15,
        path: "/shop",
        label: "Shop",
        element: <ShopHome />,
        withAuth: true,
        headerExist: true,
        mustNotAuth: false,
    },
    {
        id: 15,
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
