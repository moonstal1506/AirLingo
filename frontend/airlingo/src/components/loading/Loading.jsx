import styled from "@emotion/styled";
import Overlay from "../common/overlay";
import { Spinner } from "@/assets/icons";

function Loading() {
    return (
        <LoadingWrapper>
            <Spinner />
        </LoadingWrapper>
    );
}

const LoadingWrapper = styled(Overlay)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

export default Loading;
