import Proptypes from "prop-types";
import styled from "@emotion/styled";
import Profile from "../common/profile";

// ----------------------------------------------------------------------------------------------------

function ProfileBar({ imgSize, imgSrc, nickname }) {
    return (
        <ProfileBarWrapper>
            <Profile size={imgSize} src={imgSrc} />
            {nickname}
        </ProfileBarWrapper>
    );
}

ProfileBar.propTypes = {
    imgSize: Proptypes.string.isRequired,
    imgSrc: Proptypes.string.isRequired,
    nickname: Proptypes.string.isRequired,
};

// ----------------------------------------------------------------------------------------------------

const ProfileBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    color: white;
    font-size: 25px;
    font-weight: 700;
`;

export default ProfileBar;
