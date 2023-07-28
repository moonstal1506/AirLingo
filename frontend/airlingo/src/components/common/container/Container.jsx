import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

function Container({ width, height, children }) {
    return (
        <ContainerWrapper width={width} height={height}>
            {children}
        </ContainerWrapper>
    );
}

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

// ----------------------------------------------------------------------------------------------------

export default Container;
