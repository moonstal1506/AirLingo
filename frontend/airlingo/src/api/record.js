import instance from "./instance";
import processApiResponse from "@/utils/api";

const postScript = async ({ responseFunc, data, routeTo }) => {
    try {
        const response = await instance.post(`/api/script`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

const postStartRecording = async ({ responseFunc, data, routeTo }) => {
    try {
        const response = await instance.post(
            `/api/script/recording/start?sessionId=${data.sessionId}`,
        );
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};
const postStopRecording = async ({ responseFunc, data, routeTo }) => {
    try {
        const response = await instance.post(
            `/api/script/recording/stop?recordingId=${data.recordingId}`,
        );
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

const postEvaluate = async ({ responseFunc, data, routeTo }) => {
    try {
        const response = await instance.post(`/api/record`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

const getRecordStatistic = async ({ responseFunc, data, routeTo }) => {
    try {
        const response = await instance.get(`/api/record/statistic/${data}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

export { postScript, postEvaluate, getRecordStatistic, postStartRecording, postStopRecording };
