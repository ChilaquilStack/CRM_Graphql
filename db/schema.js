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

    type Cliente {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        telefono: String
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

    input ClienteInput {
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        telefono: String
    }

    type Query {
        getUser(token: String!): Usuario
        getProductos: [Producto]
        getProducto(id: ID!): Producto
        getClientes: [Cliente]
        getClientesByVendedor: [Cliente]
        getCliente(id: ID!): Cliente
    }

    type Mutation {
        createUsuario(input: UsuarioInput!): Usuario
        authUser(input: AuthUserInput!): Token
        createProducto(input: ProductoInput): Producto
        updateProducto(id: ID!, input: ProductoInput): Producto
        deleteProducto(id: ID!): Producto
        createCliente(input: ClienteInput!): Cliente
        updateCliente(id: ID!, input: ClienteInput!): Cliente
    }
`

module.exports = typeDefs