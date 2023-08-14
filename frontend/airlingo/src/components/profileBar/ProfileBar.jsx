import Proptypes from "prop-types";
import styled from "@emotion/styled";
import Profile from "../common/profile";
import { useRouter } from "@/hooks";

// ----------------------------------------------------------------------------------------------------

function ProfileBar({ imgSize, imgSrc, nickname, textColor }) {
    const { routeTo } = useRouter();

    return (
        <ProfileBarWrapper onClick={() => routeTo("/basicinfo")} textColor={textColor}>
            <Profile size={imgSize} src={imgSrc} />
            {nickname}
        </ProfileBarWrapper>
    );
}

ProfileBar.propTypes = {
    imgSize: Proptypes.string.isRequired,
    imgSrc: Proptypes.string.isRequired,
    nickname: Proptypes.string.isRequired,
    textColor: Proptypes.string,
};

ProfileBar.defaultProps = {
    textColor: "white",
};

// ----------------------------------------------------------------------------------------------------

const ProfileBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    color: ${({ textColor }) => textColor};
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
`;

export default ProfileBar;
