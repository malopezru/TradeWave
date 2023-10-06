const { ApolloServer } = require("apollo-server");
const resolvers = require('./src/resolvers');
const { userTypeDefs } = require('./src/typeDefs');

const server = new ApolloServer({
    typeDefs: userTypeDefs,
    resolvers
})

const PORT = 8000;
server.listen(PORT).then(({ url }) => console.log(`Server running at ${url}`));