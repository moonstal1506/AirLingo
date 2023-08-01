async function processApiResponse({ responseFunc, response }) {
    Object.entries(responseFunc).forEach(([curStatusCode, func]) => {
        if (
            response &&
            (curStatusCode === response.statusCode || curStatusCode === response.status)
        )
            func(response);
    });
}

export default processApiResponse;
