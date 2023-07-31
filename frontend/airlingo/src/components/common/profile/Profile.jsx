import PropTypes from "prop-types";
import styled from "@emotion/styled";

function Profile({ src, size }) {
    return (
        <ProfileBox size={size}>
            <ProfileWrapper src={src} />
        </ProfileBox>
    );
}

Profile.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.oneOf(["small", "normal", "large"]),
};

Profile.defaultProps = {
    size: "normal",
};

const ProfileBox = styled.div`
    border-radius: 70%;
    overflow: hidden;
    ${(props) => {
        switch (props.size) {
            case "tiny":
                return `
                  width: 30px;
                  height: 30px;
                `;
            case "small":
                return `
                  width: 50px;
                  height: 50px;
                `;
            case "normal":
                return `
                  width: 100px;
                  height: 100px;
                `;
            case "large":
                return `
                  width: 150px;
                  height: 150px;
                `;
            default:
                return "";
        }
    }}
`;

const ProfileWrapper = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default Profile;
