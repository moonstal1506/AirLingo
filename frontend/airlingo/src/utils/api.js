function processApiResponse({ responseFunc, statusCode }) {
    Object.entries(responseFunc).forEach(([curStatusCode, func]) => {
        if (curStatusCode === statusCode) func();
    });
}

export default processApiResponse;
