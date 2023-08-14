import * as Y from "yjs";
import { getStroke } from "perfect-freehand";
import PropTypes from "prop-types";
import { useLine } from "@/hooks/whiteboard";
import { getSvgPathFromStroke } from "@/utils/whiteboard";

// ----------------------------------------------------------------------------------------------------

function Drawing({ line }) {
    const { points, color, isComplete } = useLine(line);
    const pathData = getSvgPathFromStroke(
        getStroke(points, {
            size: 12,
            thinning: 0.5,
            streamline: 0.6,
            smoothing: 0.7,
            last: isComplete,
        }),
    );

    return (
        <g fill={color}>
            <path className="board-line" d={pathData} fill={isComplete ? "black" : color} />
        </g>
    );
}

Drawing.propTypes = {
    line: PropTypes.instanceOf(Y.Map).isRequired,
};

// ----------------------------------------------------------------------------------------------------

export default Drawing;
