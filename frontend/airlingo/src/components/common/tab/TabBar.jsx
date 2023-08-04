import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react"; // emotion의 css 함수를 import
import theme from "@/assets/styles/Theme";
import useRouter from "@/hooks";

const { white, black, red, yellow, green, blue } = theme.colors;

const TabBarContainer = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    padding-top: 200px;
`;

const TabButtonWrapper = styled.div``;

const TabButton = styled.div`
    display: flex;
    width: 100px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 10px 10px 0px 0px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    background-color: ${(props) => props.color};
    color: ${(props) => props.textcolor};
    transition:
        background-color 0.2s,
        transform 0.2s;

    &:not(:last-child) {
        margin-right: 10px;
    }

    ${(props) =>
        props.active &&
        css`
            width: 100px;
            height: 60px;
        `}

    &:hover {
        width: 100px;
        height: 60px;
    }
`;

function TabBar() {
    const [activeTab, setActiveTab] = useState("basicinfo");
    const { routeTo } = useRouter();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        routeTo(tab);
    };

    return (
        <TabBarContainer>
            <TabButtonWrapper>
                <TabButton
                    color={red}
                    textcolor={white}
                    active={activeTab === "basicinfo"}
                    onClick={() => handleTabClick("basicinfo")}
                >
                    기본정보
                </TabButton>
            </TabButtonWrapper>
            <TabButtonWrapper>
                <TabButton
                    color={yellow}
                    textcolor={black}
                    active={activeTab === "statistic"}
                    onClick={() => handleTabClick("statistic")}
                >
                    학습통계
                </TabButton>
            </TabButtonWrapper>
            <TabButtonWrapper>
                <TabButton
                    color={green}
                    textcolor={black}
                    active={activeTab === "wordbook"}
                    onClick={() => handleTabClick("wordbook")}
                >
                    단어장
                </TabButton>
            </TabButtonWrapper>
            <TabButtonWrapper>
                <TabButton
                    color={blue}
                    textcolor={white}
                    active={activeTab === "shop"}
                    onClick={() => handleTabClick("shop")}
                >
                    상점
                </TabButton>
            </TabButtonWrapper>
        </TabBarContainer>
    );
}

export default TabBar;
