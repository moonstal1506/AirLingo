import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "@/assets/styles/Theme";
import combineShape from "@/utils/style";

// ----------------------------------------------------------------------------------------------------

const { primary4 } = theme.colors;
const sizeStyle = {
    big: `
        width: 600px;
    `,
    medium: `
        width: 500px;
    `,
    small: `
        width: 350px;
    `,
};

// ----------------------------------------------------------------------------------------------------

function VideoFrame({ ref, size }) {
    return (
        <VideoBox size={size}>
            <VideoWrapper ref={ref} />
            {/* <UserLabel> </UserLabel> */}
        </VideoBox>
    );
}

VideoFrame.propTypes = {
    ref: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
};

const VideoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 3px solid ${primary4};
    border-radius: 10px;
    ${(props) => combineShape(sizeStyle, props.size)}
`;

const VideoWrapper = styled.video`
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

export default VideoFrame;
