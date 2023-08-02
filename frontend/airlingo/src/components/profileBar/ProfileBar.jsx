import Proptypes from "prop-types";
import styled from "@emotion/styled";
import Profile from "../common/profile";

const { VITE_S3_URL } = import.meta.env;
function ProfileBar({ imgSize, imgSrc, nickname }) {
    return (
        <ProfileBarWrapper>
            <Profile size={imgSize} src={`${VITE_S3_URL}${imgSrc}`} />
            {nickname}
        </ProfileBarWrapper>
    );
}

ProfileBar.propTypes = {
    imgSize: Proptypes.string.isRequired,
    imgSrc: Proptypes.string.isRequired,
    nickname: Proptypes.string.isRequired,
};

const ProfileBarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    color: #fff;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

export default ProfileBar;
