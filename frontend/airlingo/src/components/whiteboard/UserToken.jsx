import React from "react";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------------------------------------

const UserToken = React.memo(({ user, itSelf, index }) => {
    return (
        <>
            <circle
                key={`${user.id}_token`}
                cx={32 + 16 * index}
                cy={32}
                r={16}
                strokeWidth={2}
                stroke="white"
                fill={user.isActive ? user.color : "grey"}
            />
            {itSelf && <circle cx={32 + 16 * index} cy={56} r={4} fill={user.color} />}
        </>
    );
});

UserToken.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        point: PropTypes.arrayOf(PropTypes.number).isRequired,
        color: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
    }).isRequired,
    itSelf: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
};

// ----------------------------------------------------------------------------------------------------

export default UserToken;
