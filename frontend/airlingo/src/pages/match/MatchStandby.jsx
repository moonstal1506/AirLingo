/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";
import { formatTime } from "@/utils/format";
import { useRouter } from "@/hooks";

function DeviceSetup() {
    const [devices, setDevices] = useState([]);
    const [time, setTime] = useState(15);
    const [selectedAudioInputDevice, setSelectedAudioInputDevice] = useState("");
    const [selectedAudioOutputDevice, setSelectedAudioOutputDevice] = useState("");
    const videoRef = useRef(null);
    const { routeTo } = useRouter();

    useEffect(() => {
        if (time === 0) {
            routeTo("/meeting");
        }
    }, [time, routeTo]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        // 권한 요청
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
            // 장치 목록 가져오기
            navigator.mediaDevices.enumerateDevices().then((device) => {
                // 스트림 중지
                stream.getTracks().forEach((track) => track.stop());

                // 장치 설정
                setDevices(device);
                setSelectedAudioInputDevice(
                    device.find((cur) => cur.kind === "audioinput").deviceId,
                );
                setSelectedAudioOutputDevice(
                    device.find((cur) => cur.kind === "audiooutput").deviceId,
                );
            });
        });

        return () => {
            clearInterval(interval);
        };
    }, []);

    // 비디오 미리보기 설정
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            const video = videoRef.current;
            if (video) {
                video.srcObject = stream;
            }
        });

        // cleanup function
        return () => {
            const video = videoRef.current;
            if (video) {
                const stream = video.srcObject;
                if (stream) {
                    stream.getTracks().forEach((track) => track.stop());
                }
            }
        };
    }, []);

    return (
        <PageLayout>
            <MatchStandbyContainer>
                <TitleBox>비행기가 곧 출발합니다!</TitleBox>
                <TitleBox>
                    <SubTitleWrapper>남은 설정 시간</SubTitleWrapper>
                    <SubTitleWrapper bold>{formatTime(time)}</SubTitleWrapper>
                </TitleBox>
                <CameraBox>
                    <video ref={videoRef} autoPlay playsInline />
                </CameraBox>
                <MatchStandbySettingBox>
                    <DeviceBox>
                        <h2>입력장치 선택하기</h2>
                        <select
                            value={selectedAudioInputDevice}
                            onChange={(e) => setSelectedAudioInputDevice(e.target.value)}
                        >
                            {devices
                                .filter((device) => device.kind === "audioinput")
                                .map((device) => (
                                    <option value={device.deviceId} key={device.deviceId}>
                                        {device.label}
                                    </option>
                                ))}
                        </select>
                    </DeviceBox>

                    <DeviceBox>
                        <h2>출력장치 선택하기</h2>
                        <select
                            value={selectedAudioOutputDevice}
                            onChange={(e) => setSelectedAudioOutputDevice(e.target.value)}
                        >
                            {devices
                                .filter((device) => device.kind === "audiooutput")
                                .map((device) => (
                                    <option value={device.deviceId} key={device.deviceId}>
                                        {device.label}
                                    </option>
                                ))}
                        </select>
                    </DeviceBox>
                </MatchStandbySettingBox>
            </MatchStandbyContainer>
        </PageLayout>
    );
}

const SubTitleWrapper = styled.span`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: ${(props) => (props.bold ? 700 : 400)};
    line-height: normal;
`;

const PageLayout = styled.div`
    padding-top: 120px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MatchStandbyContainer = styled.div`
    width: 600px;
    height: 100%;
    gap: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const MatchStandbySettingBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 600px;
`;

const CameraBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;

    color: #000;
    font-family: Pretendard;
    font-size: 45px;
    font-weight: 800;
    line-height: 44px; /* 97.778% */
`;

const DeviceBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 280px;
    gap: 8px;
    position: relative;

    select {
        width: 100%;
    }
`;
const TitleBox = styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 45px;
    font-style: normal;
    font-weight: 800;
    line-height: 44px; /* 97.778% */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;
export default DeviceSetup;
