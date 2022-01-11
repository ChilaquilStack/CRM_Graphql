const { ApolloServer } = require('apollo-server')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')
const connectDB = require('./config/db')

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    connectDB();
    console.log(`Servidor listo en la URL ${url}`)
})