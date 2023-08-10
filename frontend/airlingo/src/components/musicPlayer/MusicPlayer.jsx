/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { PauseIcon, ForwardIcon, BackwardIcon, PlayIcon } from "@/assets/icons";

function MusicPlayer({ src }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    const togglePlayback = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const updateProgress = (event) => {
        const time = parseFloat(event.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleMetadataLoaded = () => {
        setDuration(audioRef.current.duration);
    };

    const skipTime = (amount) => {
        audioRef.current.currentTime += amount;
        setCurrentTime(audioRef.current.currentTime);
    };

    return (
        <MusicPlayerContainer>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleMetadataLoaded}
            />
            <ContentBox>
                <ProgressWrapper
                    type="range"
                    value={currentTime}
                    max={duration}
                    onChange={updateProgress}
                />
                <TimeTextBox>
                    <TimeTextWrapper>
                        {new Date(currentTime * 1000).toISOString().substring(14, 19)}
                    </TimeTextWrapper>
                    <TimeTextWrapper>
                        {new Date(duration * 1000).toISOString().substring(14, 19)}
                    </TimeTextWrapper>
                </TimeTextBox>
            </ContentBox>
            <ButtonBox>
                <BackwardButtonWrapper onClick={() => skipTime(-5)} />
                {isPlaying ? (
                    <PauseButtonWrapper onClick={togglePlayback} />
                ) : (
                    <PlayButtonWrapper onClick={togglePlayback} />
                )}
                <ForwardButtonWrapper onClick={() => skipTime(5)} />
            </ButtonBox>
        </MusicPlayerContainer>
    );
}

MusicPlayer.propTypes = {
    src: PropTypes.string.isRequired,
};

const MusicPlayerContainer = styled.div`
    width: 406px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 8px;
`;

const ProgressWrapper = styled.input`
    width: 100%;
    accent-color: ${({ theme }) => theme.colors.primary4};
`;

const ContentBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2px;
`;

const TimeTextBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TimeTextWrapper = styled.span`
    color: #000;
    font-size: 15px;
    font-weight: 700;
    line-height: normal;
`;

const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;

const PlayButtonWrapper = styled(PlayIcon)`
    cursor: pointer;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.75));
    &:active {
        transform: scale(0.95);
    }
`;

const PauseButtonWrapper = styled(PauseIcon)`
    cursor: pointer;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.75));
    &:active {
        transform: scale(0.95);
    }
`;

const ForwardButtonWrapper = styled(ForwardIcon)`
    cursor: pointer;
    &:active {
        transform: scale(0.95);
    }
`;

const BackwardButtonWrapper = styled(BackwardIcon)`
    cursor: pointer;
    &:active {
        transform: scale(0.95);
    }
`;

export default MusicPlayer;
