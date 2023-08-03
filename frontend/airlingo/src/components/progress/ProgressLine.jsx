import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { gray } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function ProgressLine({ isProceeding }) {
    return <StepLine isProceeding={isProceeding} />;
}

ProgressLine.propTypes = {
    isProceeding: PropTypes.bool.isRequired,
};

const StepLine = styled.div`
    width: 125px;
    height: 1px;
    flex-shrink: 0;
    background: ${(props) => (props.isProceeding ? "#333" : gray)};
`;

// ----------------------------------------------------------------------------------------------------

export default ProgressLine;
