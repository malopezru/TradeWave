const axios = require("axios");

async function generalRequest(url, method, body, headers) {
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

async function paramRequest(url, param, method, body, headers) {
	const parameters = {
		method,
		url: `${url}/${param}`,
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

module.exports = {
	generalRequest,
	paramRequest
}