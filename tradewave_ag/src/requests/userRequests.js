const { generalRequest } = require("./requests");
const { usersHost } = require("./endpoints");

const userUrl = `http://${usersHost.url}:${usersHost.port}/${usersHost.entryPoint}`;

module.exports = userRequests = async (reqType, method, body, headers) => {
    const userResponse = await generalRequest(`${userUrl}/${reqType}`, method, body, headers);
    return userResponse;
};