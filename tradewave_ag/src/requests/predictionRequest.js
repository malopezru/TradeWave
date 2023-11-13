const { generalRequest } = require("./requests");
const { predictionsHost } = require("./endpoints");

const predictionsUrl = `http://${predictionsHost.url}:${predictionsHost.port}`;

module.exports = predictionsRequests = async (reqType, method, body, headers) => {
    const predictionsResponse = await generalRequest(`${predictionsUrl}/${reqType}`, method, body, headers);
    return predictionsResponse;
};