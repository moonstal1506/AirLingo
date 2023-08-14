import { useEffect, useState } from "react";

function useUsers(awareness) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        function updateUsersState() {
            const states = awareness.getStates();

            setUsers(Array.from(states.values()));
        }

        updateUsersState();

        awareness.on("change", updateUsersState);
        return () => {
            awareness.off("change", updateUsersState);
        };
    }, [awareness]);

    return { users };
}

export default useUsers;
