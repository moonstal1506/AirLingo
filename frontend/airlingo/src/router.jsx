import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import AuthLayout from "./layout/AuthLayout";
/* fix me! 페이지 추가에 따른 등록 필요! */
const routerData = [
    {
        id: 0,
        path: "/",
        label: "Home",
        element: <Home />,
        withAuth: false,
    },
    {
        id: 1,
        path: "*",
        label: "NotFound",
        element: <Notfound />,
        withAuth: false,
    },
];

const routers = createBrowserRouter(
    routerData.map((router) => {
        if (router.withAuth) {
            return {
                path: router.path,
                element: <AuthLayout>{router.element}</AuthLayout>,
            };
        }
        return {
            path: router.path,
            element: router.element,
        };
    }),
);

export default routers;
