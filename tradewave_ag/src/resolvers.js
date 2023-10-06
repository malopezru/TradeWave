const { generalRequest } = require("./requests/requests");
const userEndpoints = require("./requests/endpoints");

const userUrl = `http://${userEndpoints.url}:${userEndpoints.port}/${userEndpoints.entryPoint}`;

module.exports = resolvers = {
	Query: {
		allUsers: (_) =>
            generalRequest(userUrl, ''),
		userById: (_, { id }) =>
			generalRequest(`${userUrl}/${id}`, 'GET'),
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${userUrl}/register`, 'POST', user),
		updateUser: (_, { id, user }) =>
			generalRequest(`${userUrl}/${id}`, 'PUT', user),
		deleteCategory: (_, { id }) =>
			generalRequest(`${userUrl}/${id}`, 'DELETE')
	}
};