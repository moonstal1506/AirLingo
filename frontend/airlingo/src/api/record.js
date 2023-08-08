import instance from "./instance";
import processApiResponse from "@/utils/api";

const postScript = async ({ responseFunc, data }) => {
    try {
        const response = await instance.post(`/api/script`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const postStartRecording = async ({ responseFunc, data }) => {
    try {
        const response = await instance.post(
            `/api/script/recording/start?sessionId=${data.sessionId}`,
        );
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};
const postStopRecording = async ({ responseFunc, data }) => {
    try {
        const response = await instance.post(
            `/api/script/recording/stop?recordingId=${data.recordingId}`,
        );
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const postEvaluate = async ({ responseFunc, data }) => {
    try {
        const response = await instance.post(`/api/record`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const getRecordStatistic = async ({ responseFunc, data }) => {
    try {
        const response = await instance.get(`/api/record/statistic/${data}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

export { postScript, postEvaluate, getRecordStatistic, postStartRecording, postStopRecording };
