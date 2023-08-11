import styled from "@emotion/styled";
import PropTypes from "prop-types";

function Overlay({ zIdx = 1000, className, children }) {
    return (
        <OverlayWrapper className={className} zIdx={zIdx}>
            {children}
        </OverlayWrapper>
    );
}

Overlay.propTypes = {
    zIdx: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Overlay.defaultProps = {
    className: "",
};

const OverlayWrapper = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: ${({ zIdx }) => zIdx};
`;

export default Overlay;
