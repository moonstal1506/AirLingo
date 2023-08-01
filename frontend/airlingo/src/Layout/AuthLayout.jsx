import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import useRouter from "../hooks";
import { getLogout, getUserProfile } from "@/api";
import { logoutUser, selectUser } from "@/features/User/UserSlice.js";

function AuthLayout({ children }) {
    const dispatch = useDispatch();
    const storeUser = useSelector(selectUser);
    const { userLoginId } = storeUser;
    const [userProfile, setUserProfile] = useState({});
    const { routeTo } = useRouter();

    const checkValidAuth = useCallback(async () => {
        const { data } = await getUserProfile({
            responseFunc: {
                200: (response) => {
                    setUserProfile(response.data);
                },
                400: () => {
                    dispatch(logoutUser());
                    routeTo("/login");
                },
            },
            data: { userLoginId },
        });

        if (!data) {
            await getLogout({
                responseFunc: {
                    200: () => {
                        dispatch(logoutUser());
                        routeTo("/login");
                    },
                    data: { userLoginId },
                },
            });
        }
    }, [routeTo, userLoginId, dispatch]);

    useEffect(() => {
        /* 1차 체킹. 현재, 로컬에 지정된 상태로 user의 프로필 정보를 받아올 수 있는지 체크 */
        async function fetchProfile() {
            checkValidAuth();
        }
        fetchProfile();
    }, [children, checkValidAuth]);

    /* 2차 체킹. 받아온 userProfile과 현재 store에 저장된 storeUser가 동일한지 체킹 */
    Object.entries(storeUser).forEach(([key, value]) => {
        if (Object.prototype.hasOwnProperty.call(userProfile, key) && userProfile[key] !== value) {
            dispatch(logoutUser());
            routeTo("/login");
        }
    });

    return { children };
}

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthLayout;
