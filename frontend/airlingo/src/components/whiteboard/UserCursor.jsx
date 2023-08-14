/* eslint-disable react-refresh/only-export-components */
import React from "react";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------------------------------------

function UserCursor({ user }) {
    return (
        <circle
            key={user.id}
            cx={user.point[0]}
            cy={user.point[1]}
            r={4}
            fill={user.isActive ? user.color : "grey"}
        />
    );
}

UserCursor.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        point: PropTypes.arrayOf(PropTypes.number).isRequired,
        color: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
    }).isRequired,
};

// ----------------------------------------------------------------------------------------------------

export default React.memo(UserCursor);
