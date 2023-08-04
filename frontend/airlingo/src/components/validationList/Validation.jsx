import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { ReactComponent as ValidationCheckIcon } from "@/assets/imgs/icons/validation-check-icon.svg";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { green, red } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function Validation({ text, isValid }) {
    return (
        <ValidationContainer>
            <ValidationTextWrapper isValid={isValid}>
                <ValidationCheckIcon />
                {text}
            </ValidationTextWrapper>
        </ValidationContainer>
    );
}

Validation.propTypes = {
    text: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
};

const ValidationContainer = styled.div`
    display: flex;
    justify-content: left;
    align-content: center;
    gap: 10px;
`;

const ValidationTextWrapper = styled.div`
    display: flex;
    align-items: center;
    color: ${(props) => (props.isValid ? green : red)};
    font-size: 15px;
    font-weight: 400;
    height: 25px;
    margin: 3px;
`;

// ----------------------------------------------------------------------------------------------------

export default Validation;
