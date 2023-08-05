import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useRouter } from "../hooks";
import { selectUser } from "@/features/User/UserSlice.js";

function NotAuthLayout({ children }) {
    const { isLogIn } = useSelector(selectUser);
    const { routeTo } = useRouter();

    // 1. 로그인 체킹 : 로그인 된 상태일 시에, 에러 페이지 이동.
    if (isLogIn) routeTo("/notfound");
    return <>{children}</>;
}

NotAuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default NotAuthLayout;
