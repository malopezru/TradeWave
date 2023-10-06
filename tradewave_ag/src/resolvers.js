const generalRequest = require("./requests/requests");
const userEndpoints = require("./requests/endpoints");

const userUrl = `http://${userEndpoints.url}:${userEndpoints.port}/${userEndpoints.entryPoint}`;

module.exports = resolvers = {
	Query: {
		allUsers: () =>
            generalRequest(userUrl, ''),
		userById: (_, { id }) =>
			generalRequest(`${userUrl}/${id}`, 'GET'),
	},
	Mutation: {
		createUser: (_, { email, name,  password }) =>
			generalRequest(`${userUrl}/register`, 'POST', { email, name, password }),
		/* updateUser: (_, { id, email, name, password }) =>
			generalRequest(`${userUrl}/${id}`, 'PUT', email),
		deleteCategory: (_, { id }) =>
			generalRequest(`${userUrl}/${id}`, 'DELETE') */
	}
};