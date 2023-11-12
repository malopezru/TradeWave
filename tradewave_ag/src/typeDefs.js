const { gql } = require("apollo-server");

const userTypeDefs = gql`
    type User {
        name: String!
        password: String!
        email: String!
        id: Int!
    }

    type Token {
        token: String!
    }

    type Query {
        allUsers: [User]
        userById(id: Int!): User
        getMe(token: String!): User
    }

    type Mutation {
        createUser(
            name: String!
            password: String!
            email: String!
            ): User!
        
        updateUser(
            id: Int!
            email: String!
            name: String!
            password: String!
        ): User!

        loginUser(
            email: String!
            password: String!
        ): Token!
    }
`

module.exports = {
    userTypeDefs
}