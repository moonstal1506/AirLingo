/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useCallback, useEffect, useReducer } from "react";
import { selectUser } from "@/features/User/UserSlice";
import { selectMeeting } from "@/features/Meeting/MeetingSlice";
import theme from "@/assets/styles/Theme";
import { IconButton } from "@/components/common/button";
import * as Icons from "@/assets/icons";
import { useKeyBoardEvents, useLines, useUser } from "@/hooks/whiteboard";
import Line from "@/components/whiteboard/Line";

// ----------------------------------------------------------------------------------------------------

const { primary4 } = theme.colors;
const doc = new Y.Doc();
const provider = new WebsocketProvider("ws://localhost:1234", "whiteboard", doc);
const { awareness } = provider;
const yLines = doc.getArray("whiteboard");
const undoManager = new Y.UndoManager(yLines);
function getPoint(x, y) {
    return [x - 250, y - 225];
}

// ----------------------------------------------------------------------------------------------------

function WhiteBoard({ publisher, subscribers }) {
    const { userNickname } = useSelector(selectUser);
    const { otherUser } = useSelector(selectMeeting);
    const { updateUserPoint, activateUser, deactivateUser } = useUser(awareness);
    const {
        lines,
        isSynced,
        startLine,
        addPointToLine,
        completeLine,
        clearAllLines,
        undoLine,
        redoLine,
    } = useLines(yLines, provider, undoManager, doc, awareness);
    useKeyBoardEvents(undoManager);

    const handlePointerDown = useCallback(
        (e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            startLine(getPoint(e.clientX, e.clientY));
        },
        [startLine],
    );

    const handlePointerMove = useCallback(
        (e) => {
            const point = getPoint(e.clientX, e.clientY);
            updateUserPoint(point);

            if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                addPointToLine(point);
            }
        },
        [addPointToLine, updateUserPoint],
    );

    const handlePointerUp = useCallback(
        (e) => {
            e.currentTarget.releasePointerCapture(e.pointerId);
            completeLine();
        },
        [completeLine],
    );

    // eslint-disable-next-line no-unused-vars
    const [_, forceUpdate] = useReducer((s) => !s, false);

    useEffect(() => {
        const timeout = setInterval(forceUpdate, 30);
        return () => clearInterval(timeout);
    }, []);

    return (
        <>
            <VideoContainer>
                <VideoBox>
                    <VideoFrame>
                        {publisher ? (
                            <video
                                ref={(node) => node && publisher.addVideoElement(node)}
                                autoPlay
                                width="350px"
                            />
                        ) : (
                            <PlaceholderBox>카메라를 로딩하고 있습니다.</PlaceholderBox>
                        )}
                    </VideoFrame>
                    <div>
                        <b>{userNickname}</b>(나)
                    </div>
                </VideoBox>
                <VideoBox>
                    <VideoFrame>
                        {subscribers.length > 0 ? (
                            <video
                                ref={(node) => node && subscribers[0].addVideoElement(node)}
                                autoPlay
                                width="350px"
                            />
                        ) : (
                            <PlaceholderBox>카메라를 로딩하고 있습니다.</PlaceholderBox>
                        )}
                    </VideoFrame>
                    <div>
                        <b>{otherUser.userNickname}</b>(상대방)
                    </div>
                </VideoBox>
            </VideoContainer>
            <BoardContainer>
                <svg
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerEnter={activateUser}
                    onPointerLeave={deactivateUser}
                    opacity={isSynced ? 1 : 0.2}
                >
                    <g>
                        {lines.map((line) => (
                            <Line key={line.get("id")} line={line} />
                        ))}
                    </g>
                </svg>
                <ControllerBox>
                    <IconButton
                        icon={Icons.DeleteIcon}
                        onClick={undoLine}
                        iconColor="white"
                        shape="blacklined"
                    />
                    <IconButton
                        icon={Icons.DeleteIcon}
                        onClick={redoLine}
                        iconColor="white"
                        shape="blacklined"
                    />
                    <IconButton
                        icon={Icons.DeleteIcon}
                        onClick={clearAllLines}
                        iconColor="white"
                        shape="redlined"
                    />
                </ControllerBox>
            </BoardContainer>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

const VideoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 25px;
    margin: 10px 0;
`;

const VideoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 250px;
    font-size: 17px;
    font-weight: 400;
`;

const VideoFrame = styled.div`
    box-sizing: border-box;
    overflow: hidden;
    width: 250px;
    height: 187.5px;
    border: 3px solid ${primary4};
    border-radius: 20px;
    video {
        width: 100%;
    }
`;

const PlaceholderBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    width: 250px;
    height: 187.5px;
    background-color: black;
    border-radius: 20px;
    color: white;
`;

const BoardContainer = styled.div`
    display: flex;
    width: 1010px;
    height: 500px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: white;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25) inset;
    gap: 5px;
    position: relative;
    z-index: 2;
    svg {
        position: absolute;
        touch-action: none;
        width: 100%;
        height: 100%;
    }
`;

const ControllerBox = styled.div`
    display: flex;
    position: absolute;
    gap: 10px;
    left: 10px;
    top: 10px;
    z-index: 10;
`;

// ----------------------------------------------------------------------------------------------------

export default WhiteBoard;
