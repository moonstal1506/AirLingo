import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { faintgray, distinctgray } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function ProgressLine({ isProceeding }) {
    return <StepLine isProceeding={isProceeding} />;
}

ProgressLine.propTypes = {
    isProceeding: PropTypes.bool.isRequired,
};

// ----------------------------------------------------------------------------------------------------

const StepLine = styled.div`
    width: 100px;
    height: ${(props) => (props.isProceeding ? "2px" : "1px")};
    border-radius: 2px;
    flex-shrink: 0;
    background-color: ${(props) => (props.isProceeding ? distinctgray : faintgray)};
`;

// ----------------------------------------------------------------------------------------------------

export default ProgressLine;
