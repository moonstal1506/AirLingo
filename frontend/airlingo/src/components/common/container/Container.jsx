import styled from "@emotion/styled";
import PropTypes from "prop-types";

function Container({ width, height, children }) {
    return (
        <ContainerWrapper width={width} height={height}>
            {children}
        </ContainerWrapper>
    );
}

Container.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
};

const ContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    padding: 20px 20px;
    border-radius: 20px;
    border: 3px solid ${(props) => props.theme.colors.primary4};
`;

export default Container;
