import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useRouter = () => {
    const navigate = useNavigate();

    const routeTo = useCallback(
        (path, state = {}) => {
            navigate(path, state);
        },
        [navigate],
    );

    return {
        routeTo,
    };
};

export default useRouter;
