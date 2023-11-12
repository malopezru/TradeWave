const { generalRequest } = require("./requests/requests");
const { usersHost } = require("./requests/endpoints");

const userUrl = `http://${usersHost.url}:${usersHost.port}/${usersHost.entryPoint}`;

module.exports = resolvers = {
	Query: {
		allUsers: () =>
            generalRequest(userUrl, ''),
		userById: (_, { id, token }) =>
			generalRequest(`${userUrl}/${id}`, 'GET', {}, { Authorization: token }),
		getMe: (_, { token }) =>
			generalRequest(`${userUrl}/getMe`, 'GET', {}, { Authorization: token })
	},
	Mutation: {
		createUser: (_, { email, name,  password }) =>
			generalRequest(`${userUrl}/register`, 'POST', { email, name, password }),
		loginUser: (_, { email, password }) =>
			generalRequest(`${userUrl}/loginUser`, 'POST', { email, password }),
		updateUser: (_, { id, email, name, password }) =>
			generalRequest(`${userUrl}/${id}`, 'PUT', { email, name, password }, { Authorization: token }),
		/* deleteCategory: (_, { id }) =>
			generalRequest(`${userUrl}/${id}`, 'DELETE', {}, { Authorization: token }) */
	}
};