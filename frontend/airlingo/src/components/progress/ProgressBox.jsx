import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { ReactComponent as StepCircleIcon } from "@/assets/imgs/icons/step-circle-icon.svg";

// ----------------------------------------------------------------------------------------------------

function ProgressBox({ text, step }) {
    return (
        <ProgressContainer>
            <StepCircleIcon>{step}</StepCircleIcon>
            <ProgressTextWrapper>{text}</ProgressTextWrapper>
        </ProgressContainer>
    );
}

ProgressBox.propTypes = {
    step: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

const ProgressContainer = styled.div`
    text-align: center;
    gap: 8px;
`;

const ProgressTextWrapper = styled.div`
    color: #333;
    font-size: 20px;
    font-weight: 400;
`;

// ----------------------------------------------------------------------------------------------------

export default ProgressBox;
