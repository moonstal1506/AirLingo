import styled from "@emotion/styled";

function Overlay({ zIdx = 999, children }) {
    return <OverlayWrapper zIdx={zIdx}>{children}</OverlayWrapper>;
}

const OverlayWrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: ${({ zIdx }) => zIdx};
`;

export default Overlay;
