// import PropTypes from "prop-types";
import styled from "@emotion/styled";
// import { ScriptSlideMenu } from "@/components/common/slideMenu";
import { useState } from "react";
import { FabButton } from "@/components/common/button";
import * as Icons from "@/assets/imgs/icons";

// ----------------------------------------------------------------------------------------------------

// const [isActive, setIsActive] = useState(false);

// ----------------------------------------------------------------------------------------------------

function Meeting() {
    const handleMicrophoneClick = () => {
        console.log("Microphone");
    };

    const handleVideoClick = () => {
        console.log("Video");
    };

    const handleChatClick = () => {
        console.log("Chat");
    };

    const handleBoardClick = () => {
        console.log("Board");
    };

    const handleShareClick = () => {
        console.log("Share");
    };

    const handleCardClick = () => {
        console.log("Card");
    };

    const handleReportClick = () => {
        console.log("Report");
    };

    const handleExitClick = () => {
        console.log("Exit");
    };

    const buttonList = [
        {
            buttonName: "Microphone",
            icon: Icons.MicrophoneIcon,
            onClick: handleMicrophoneClick,
        },
        {
            buttonName: "Video",
            icon: Icons.VideoIcon,
            onClick: handleVideoClick,
        },
        {
            buttonName: "Chat",
            icon: Icons.ChatIcon,
            onClick: handleChatClick,
        },
        {
            buttonName: "Board",
            icon: Icons.BoardIcon,
            onClick: handleBoardClick,
        },
        {
            buttonName: "Share",
            icon: Icons.ShareIcon,
            onClick: handleShareClick,
        },
        {
            buttonName: "Card",
            icon: Icons.CardIcon,
            onClick: handleCardClick,
        },
        {
            buttonName: "Report",
            icon: Icons.ReportIcon,
            onClick: handleReportClick,
            category: "red",
            iconColor: "white",
        },
        {
            buttonName: "Exit",
            icon: Icons.ExitIcon,
            onClick: handleExitClick,
            category: "red",
            iconColor: "white",
        },
    ];

    return (
        <MeetingContainer>
            <ButtonMenu>
                {Object.entries(buttonList).map(([buttonName, CurButton]) => (
                    <CurButton key={buttonName} />
                ))}
            </ButtonMenu>
        </MeetingContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

const MeetingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ButtonMenu = styled.div`
    height: fit-content;
    position: fixed;
    bottom: 0;
    margin-bottom: 20px;
    display: flex;
    flex-shrink: 0;
    gap: 20px;
`;

// ----------------------------------------------------------------------------------------------------

export default Meeting;
