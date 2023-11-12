const axios = require("axios");

module.exports = async function generalRequest(url, method, body, headers) {
	const parameters = {
		method,
		url,
        data: body,
		headers
	};

	try {
		console.log(parameters);
		const result = await axios(parameters);
		console.log(result.data);
		return result.data;
	} catch (err) {
		return err;
	}
}