const { gql } = require('apollo-server')

const typeDefs = gql`

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

    type Query {
        getCurso: String
    }

    type Mutation {
        createUsuario(input: UsuarioInput!): String
    }
`

module.exports = typeDefs