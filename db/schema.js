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

    type Producto {
        id: ID
        nombre: String
        existencia: Int
        precio: Float
        creado: String
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

    input ProductoInput {
        nombre: String!
        existencia: Int!
        precio: Float!
    }

    type Query {
        getUser(token: String!): Usuario
        getProductos: [Producto]
        getProducto(id: ID!): Producto
    }

    type Mutation {
        createUsuario(input: UsuarioInput!): Usuario
        authUser(input: AuthUserInput!): Token
        createProducto(input: ProductoInput): Producto
    }
`

module.exports = typeDefs