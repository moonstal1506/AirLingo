import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { gray } = theme.colors;

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

const ProgressContainer = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const ProgressStepWrapper = styled.div`
    width: 30px; /* Adjust width as needed */
    height: 30px; /* Adjust height as needed */
    border-radius: 50%;
    background-color: ${(props) => (props.isProceeding ? "#333" : gray)};
    color: white;
    font-size: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const ProgressTextWrapper = styled.div`
    color: ${(props) => (props.isProceeding ? "#333" : gray)};
    font-size: 20px;
    font-weight: 400;
`;

// ----------------------------------------------------------------------------------------------------

export default ProgressBox;
