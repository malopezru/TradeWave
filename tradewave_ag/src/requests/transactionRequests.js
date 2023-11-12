const { generalRequest, paramRequest } = require("./requests");
const { transactionsHost } = require("./endpoints");

const url = `http://${transactionsHost.url}:${transactionsHost.port}/${transactionsHost.entryPoint}`;

module.exports = transactionRequests = async (reqType, method, body, headers) => {
    let response;
    response = await generalRequest(`${url}/${reqType}`, method, body, headers);
    return response;
};