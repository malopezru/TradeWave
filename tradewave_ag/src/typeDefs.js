const { gql } = require("apollo-server");

const userTypeDefs = gql`
    type User {
        name: String!
        lastname: String!
        password: String!
        user: String!
        id: Int!
    }

    type Query {
        allUsers: [User]!
        userById(id: Int!): User!
    }

    type Mutations {
        createUser(
            name: String!
            lastname: String!
            password: String!
            user: String!
            ): User!
    }
`

module.exports = {
    userTypeDefs
}