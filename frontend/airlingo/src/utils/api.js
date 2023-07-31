function processApiResponse({ responseFunc, response }) {
    Object.entries(responseFunc).forEach(([curStatusCode, func]) => {
        if (curStatusCode === response.statusCode) func(response);
    });
}

export default processApiResponse;
