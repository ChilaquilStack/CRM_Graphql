const { gql } = require('apollo-server')

const typeDefs = gql`

    type Token {
        token: String
    }

    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        createdAt: String
    }

    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        password: String!
    }

    input AuthUserInput {
        email: String
        password: String
    }

    type Query {
        getUser(token: String!): Usuario
    }

    type Mutation {
        createUsuario(input: UsuarioInput!): Usuario
        authUser(input: AuthUserInput!): Token
    }
`

module.exports = typeDefs