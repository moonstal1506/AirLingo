import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import styled from "@emotion/styled";
import {
    MyPageHome,
    BasicInfoPage1,
    BasicInfoPage2,
    StatisticHome1,
    StatisticHome2,
} from "@/pages/mypage";

function MyPageBook() {
    const pageFlipRef = useRef(null);

    // const handlePageTurn = () => {
    //     if (pageFlipRef.current) {
    //         pageFlipRef.current.getPageFlip().flipNext();
    //     }
    // };

    return (
        <MyPageContainer>
            <BookContainer>
                <HTMLFlipBook ref={pageFlipRef} width={505} height={705}>
                    <div style={{ width: "100%", height: "100%" }} />
                    {/* <PageCover onClick={handlePageTurn} /> */}
                    <PageCover />
                    <Page1 />
                    <Page2 />
                    <Page3 />
                    <Page4 />
                </HTMLFlipBook>
            </BookContainer>
        </MyPageContainer>
    );
}

const MyPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const BookContainer = styled.div`
    width: 1015px;
    height: 755px;
    flex-shrink: 0;
    margin-top: 200px;
    cursor: pointer;
`;

const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref} data-density="hard">
            <MyPageHome />
        </div>
    );
});

const Page1 = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref} data-density="hard">
            <BasicInfoPage1 />
        </div>
    );
});

const Page2 = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref} data-density="hard">
            <BasicInfoPage2 />
        </div>
    );
});

const Page3 = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref} data-density="hard">
            <StatisticHome1 />
        </div>
    );
});

const Page4 = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref} data-density="hard">
            <StatisticHome2 />
        </div>
    );
});

export default MyPageBook;
