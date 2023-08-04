async function processApiResponse({ responseFunc, response }) {
    Object.entries(responseFunc).forEach(([curStatusCode, func]) => {
        console.log(curStatusCode);
        console.log(response);
        if (
            response &&
            (+curStatusCode === response.data.statusCode || +curStatusCode === response.data.status)
        )
            func(response);
    });
}

export default processApiResponse;
