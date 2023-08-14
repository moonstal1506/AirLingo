import * as Y from "yjs";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toPairs } from "@/utils/whiteboard";

// ----------------------------------------------------------------------------------------------------

function useLine(line) {
    const [isComplete, setIsComplete] = useState(false);
    const [color, setColor] = useState("");
    const [pts, setPts] = useState([]);

    useEffect(() => {
        function handleChange() {
            const current = line.toJSON();
            setIsComplete(current.isComplete);
            setColor(current.userColor);
        }
        handleChange();
        line.observe(handleChange);
        return () => {
            line.unobserve(handleChange);
        };
    }, [line]);

    useEffect(() => {
        const points = line.get("points");

        function handleChange() {
            setPts(toPairs(points.toArray()));
        }

        handleChange();

        points.observe(handleChange);

        return () => {
            points.unobserve(handleChange);
        };
    }, [line]);

    return { points: pts, color, isComplete };
}

useLine.propTypes = {
    line: PropTypes.instanceOf(Y.Map).isRequired,
};

// ----------------------------------------------------------------------------------------------------

export default useLine;
