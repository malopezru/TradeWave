const { gql } = require("apollo-server");

const userTypeDefs = gql`
    type User {
        name: String!
        password: String!
        email: String!
        id: Int!
    }

    type Query {
        allUsers: [User]
        userById(id: Int!): User
    }

    type Mutation {
        createUser(
            name: String!
            password: String!
            email: String!
            ): User!
    }
`

module.exports = {
    userTypeDefs
}