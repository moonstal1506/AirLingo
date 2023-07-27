import styled from "@emotion/styled";

const combineObj = {
    top: {
        position: `
            top: 0;
            width: 100%;
        `,
        transform: "translate(0, -100%);",
    },
    bottom: {
        position: `
            bottom: 0;
            width: 100%;
        `,
        transform: "translate(0, 100%);",
    },
    left: {
        position: `
            left: 0;
            top:0;
            height: 100%;
        `,
        transform: "translate(-100%, 0);",
    },
    right: {
        position: `
            top:0;
            right: 0;
            height: 100%;
        `,
        transform: "translate(100%, 0);",
    },
};

function SlideMenu({ direction = "left", isOpen, children }) {
    return (
        <div>
            <SlideMenuWrapper isOpen={isOpen} direction={direction}>
                {children}
            </SlideMenuWrapper>
        </div>
    );
}

const SlideMenuWrapper = styled.div`
    position: absolute;
    background-color: #f0f0f0;
    transition: transform 0.3s ease-in-out;
    ${({ direction, isOpen }) => `
      ${combineObj[direction].position}
      transform : ${isOpen ? "transform: translate(0%, 0%);" : combineObj[direction].transform}
    `}
`;

export default SlideMenu;
