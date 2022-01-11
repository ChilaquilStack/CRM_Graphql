const { ApolloServer } = require('apollo-server')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
        usuario: {
            id: 1
        }
    })
})

server.listen().then(({url}) => console.log(`Servidor listo en la URL ${url}`))