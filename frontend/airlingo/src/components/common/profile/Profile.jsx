import styled from "@emotion/styled";

function Profile({ src, size = "normal" }) {
    return <ProfileWrapper src={src} size={size} />;
}

const ProfileWrapper = styled.img`
    ${(props) => {
        switch (props.size) {
            case "small":
                return `
                  width : 50px;
                  height : 50px;
                `;
            case "normal":
                return `
                  width : 100px;
                  height : 100px;
                `;
            case "large":
                return `
                  width : 150px;
                  height : 150px;
                `;
            default:
                return "";
        }
    }}
`;

export default Profile;
