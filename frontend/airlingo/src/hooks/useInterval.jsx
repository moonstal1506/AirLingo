import { useEffect, useState } from "react";

const useInterval = (callback, delay) => {
    const [savedCallback, setSavedCallback] = useState(null); // useState사용

    useEffect(() => {
        setSavedCallback(callback);
    }, [callback]);

    useEffect(() => {
        const executeCallback = () => {
            savedCallback();
        };

        const timerId = setInterval(executeCallback, delay);

        return () => clearInterval(timerId);
    }, [delay, savedCallback]);
};

export default useInterval;
