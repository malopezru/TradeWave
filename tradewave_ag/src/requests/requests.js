const axios = require("axios");

module.exports = async function generalRequest(url, method, body, headers) {
	const parameters = {
		method,
		url,
        data: body,
		headers
	};

	try {
        const reqResult = await axios(parameters);
		return reqResult.data;
	} catch (err) {
		return err;
	}
}