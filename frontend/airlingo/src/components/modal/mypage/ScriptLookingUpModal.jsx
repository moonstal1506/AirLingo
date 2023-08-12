/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from "react";
import styled from "@emotion/styled";
import MusicPlayer from "@/components/musicPlayer";
import Modal from "../Modal";
import ChatList from "@/components/chatList/ChatList";
import { TextButton } from "@/components/common/button";

function filterScriptContent(text) {
    const result = [];
    const lines = text.split("\n");

    let currentUser = "";
    let tempContent = [];
    let isUser = true;

    lines.forEach((line) => {
        if (isUser) {
            currentUser = line;
            isUser = false;
        } else if (line === "") {
            const content = tempContent.join("\n");
            result.push({ userNickname: currentUser, content, userImgUrl: "" });
            tempContent = [];
            isUser = true;
        } else {
            tempContent.push(line);
        }
    });
    if (tempContent.length > 0) {
        result.push({ userNickname: currentUser, content: tempContent.join("\n"), userImgUrl: "" });
    }

    return result;
}

/* eslint-disable react/prop-types */
function ScriptLookingUpModal({ isOpen, script, onClick }) {
    if (!script) return null;
    let { scriptContent, scriptUrl } = script;
    const scriptData = useMemo(() => filterScriptContent(scriptContent), [scriptContent]);
    return (
        isOpen && (
            <Modal zIdx={1000} title="스크립트 조회" width="80%" gap="40px">
                <MusicPlayerWrapper>
                    <MusicPlayer src={scriptUrl} />
                </MusicPlayerWrapper>
                <ChatList data={scriptData} />
                <TextButton text="나가기" onClick={onClick} shape="positive-curved-large" />
            </Modal>
        )
    );
}

const MusicPlayerWrapper = styled.div`
    width: 470px;
`;

export default ScriptLookingUpModal;
