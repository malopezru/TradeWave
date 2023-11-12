const { generalRequest } = require("./requests");
const { transactionsHost } = require("./endpoints");

const url = `http://${transactionsHost.url}:${transactionsHost.port}/${transactionsHost.entryPoint}`;

module.exports = transactionRequests = async (reqType, stock, method, body, headers) => {
    let response;
    if (stock != undefined) {
        response = await generalRequest(`${url}/${reqType}`, method, body, headers);
    } else {
        response = await paramRequest(`${url}/${reqType}`, stock, method, body, headers)
    }
    return response;
};