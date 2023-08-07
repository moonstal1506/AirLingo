import { useNavigate } from "react-router-dom";

const useRouter = () => {
    const router = useNavigate();

    return {
        routeTo: (path, state = {}) => router(path, state),
    };
};

export default useRouter;
