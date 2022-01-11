const { gql } = require('apollo-server')

const typeDefs = gql`

    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        createdAt: String
    }

    type Query {
        getCurso: String
    }

    type Mutation {
        createUsuario : String
    }
`

module.exports = typeDefs