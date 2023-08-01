import { useNavigate } from "react-router-dom";

const useRouter = () => {
    const router = useNavigate();

    return {
        routeTo: (path) => router(path),
    };
};

export default useRouter;
