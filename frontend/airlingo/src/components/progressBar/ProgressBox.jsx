import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { faintgray, distinctgray } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function ProgressBox({ text, step, isProceeding }) {
    return (
        <ProgressContainer>
            <ProgressStepWrapper isProceeding={isProceeding}>{step}</ProgressStepWrapper>
            <ProgressTextWrapper isProceeding={isProceeding}>{text}</ProgressTextWrapper>
        </ProgressContainer>
    );
}

ProgressBox.propTypes = {
    step: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isProceeding: PropTypes.bool.isRequired,
};

// ----------------------------------------------------------------------------------------------------

const ProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 120px;
    text-align: center;
`;

const ProgressStepWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${(props) => (props.isProceeding ? distinctgray : faintgray)};
    font-size: 15px;
    font-weight: 900;
    color: white;
`;

const ProgressTextWrapper = styled.div`
    color: ${(props) => (props.isProceeding ? distinctgray : faintgray)};
    font-size: 20px;
    font-weight: ${(props) => (props.isProceeding ? 700 : 400)};
`;

// ----------------------------------------------------------------------------------------------------

export default ProgressBox;
