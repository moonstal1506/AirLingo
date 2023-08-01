import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import AuthLayout from "./layout/AuthLayout";
import Header from "./components/header";
/* fix me! 페이지 추가에 따른 등록 필요! */
const routerData = [
    {
        id: 0,
        path: "/",
        label: "Home",
        element: <Home />,
        withAuth: false,
        headerExist: true,
    },
    {
        id: 1,
        path: "*",
        label: "NotFound",
        element: <Notfound />,
        withAuth: false,
        headerExist: true,
    },
];

const routers = createBrowserRouter(
    routerData.map((router) => {
        if (router.withAuth) {
            return {
                path: router.path,
                element: (
                    <AuthLayout>
                        <div>
                            {router.headerExist && <Header />}
                            {router.element}
                        </div>
                    </AuthLayout>
                ),
            };
        }
        return {
            path: router.path,
            element: (
                <>
                    {router.headerExist && <Header />}
                    {router.element}
                </>
            ),
        };
    }),
);

export default routers;
