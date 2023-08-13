/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { selectUser } from "@/features/User/UserSlice.js";
import { MatchHome } from "@/pages/match";
import Home from "@/pages/home/Home";

function HomeLayout({ router }) {
    const { isLogIn } = useSelector(selectUser);

    if (isLogIn) {
        router.withAuth = true;
        router.mustNotAuth = false;
        return <MatchHome />;
    }
    router.withAuth = false;
    router.mustNotAuth = true;
    return <Home />;
}

export default HomeLayout;
