import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import styled from "@emotion/styled";
import { MyPageHome, StatisticHome1, StatisticHome2 } from "@/pages/mypage";

function MyPageBook() {
    const pageFlipRef = useRef(null);

    const handlePageTurn = () => {
        if (pageFlipRef.current) {
            pageFlipRef.current.getPageFlip().flipNext();
        }
    };

    return (
        <BookContainer>
            <HTMLFlipBook ref={pageFlipRef} width={505} height={705}>
                <div style={{ width: "100%", height: "100%" }} />
                <PageCover onClick={handlePageTurn} />
                <Page1 />
                <Page2 />
            </HTMLFlipBook>
        </BookContainer>
    );
}

const BookContainer = styled.div`
    width: 1015px;
    height: 755px;
    flex-shrink: 0;
    margin-top: 235px;
    margin-left: 18%;
    cursor: pointer;
`;

const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover" ref={ref} data-density="hard">
            <MyPageHome />
        </div>
    );
});

const Page1 = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
            <StatisticHome1 />
        </div>
    );
});

const Page2 = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
            <StatisticHome2 />
        </div>
    );
});

export default MyPageBook;
