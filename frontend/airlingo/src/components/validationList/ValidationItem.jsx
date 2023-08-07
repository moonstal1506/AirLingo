import styled from "@emotion/styled";
import PropTypes from "prop-types";
import * as Icons from "@/assets/icons";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { faintgray, primary4, warning } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function ValidationItem({ text, isDirty, isValid }) {
    return (
        <ValidationContainer isDirty={isDirty} isValid={isValid}>
            <IconWrapper isDirty={isDirty} isValid={isValid}>
                {!isDirty && <Icons.ValidationCleanIcon />}
                {isDirty && isValid && <Icons.ValidationValidIcon />}
                {isDirty && !isValid && <Icons.ValidationInvalidIcon />}
            </IconWrapper>
            <ValidationTextWrapper isDirty={isDirty} isValid={isValid}>
                {text}
            </ValidationTextWrapper>
        </ValidationContainer>
    );
}

ValidationItem.propTypes = {
    text: PropTypes.string.isRequired,
    isDirty: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
};

// ----------------------------------------------------------------------------------------------------

const ValidationContainer = styled.div`
    display: flex;
    justify-content: left;
    align-content: center;
    gap: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
`;

const IconWrapper = styled.div`
    display: block;
    width: 25px;
    height: 25px;
    svg path {
        fill: ${(props) => {
            if (props.isDirty) {
                return props.isValid ? primary4 : warning;
            }
            return faintgray;
        }};
    }
`;

const ValidationTextWrapper = styled.div`
    display: flex;
    align-items: center;
    color: ${(props) => {
        if (props.isDirty) {
            return props.isValid ? primary4 : warning;
        }
        return faintgray;
    }};
    font-size: 15px;
    font-weight: 500;
    height: 25px;
`;

// ----------------------------------------------------------------------------------------------------

export default ValidationItem;
