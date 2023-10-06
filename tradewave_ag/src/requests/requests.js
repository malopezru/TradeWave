const axios = require("axios");

module.exports = async function generalRequest(url, method, body, headers) {
	const parameters = {
		method,
		url,
        data: body,
		headers
	};

	try {
        const result = await axios(parameters);
		return result.data;
	} catch (err) {
		return err;
	}
}