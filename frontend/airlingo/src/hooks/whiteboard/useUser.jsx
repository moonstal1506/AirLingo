import { useState, useEffect, useCallback } from "react";

// ----------------------------------------------------------------------------------------------------

const USER_COLORS = [
    "#EC5E41",
    "#F2555A",
    "#F04F88",
    "#E34BA9",
    "#BD54C6",
    "#9D5BD2",
    "#7B66DC",
    "#5373E6",
    "#369EFF",
    "#02B1CC",
    "#11B3A3",
    "#39B178",
    "#55B467",
    "#FF802B",
];
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ----------------------------------------------------------------------------------------------------

function useUser(awareness) {
    const [user, setUser] = useState();

    useEffect(() => {
        const userObj = {
            id: awareness.clientID,
            point: [0, 0],
            color: sample(USER_COLORS),
            isActive: true,
        };

        awareness.setLocalState(userObj);

        setUser(awareness.getLocalState());
    }, [awareness]);

    const activateUser = useCallback(() => {
        awareness.setLocalStateField("isActive", true);
        setUser(awareness.getLocalState());
    }, [awareness]);

    const deactivateUser = useCallback(() => {
        awareness.setLocalStateField("isActive", false);
        setUser(awareness.getLocalState());
    }, [awareness]);

    const updateUserPoint = useCallback(
        (point) => {
            awareness.setLocalStateField("point", point);
            setUser(awareness.getLocalState());
        },
        [awareness],
    );

    return { user, updateUserPoint, activateUser, deactivateUser };
}

// ----------------------------------------------------------------------------------------------------

export default useUser;
