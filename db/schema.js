const { gql } = require('apollo-server')

const typeDefs = gql`

    type Curso {
        titulo: String
    }
    
    type Tecnologia {
        tecnologia: String
    }

    type Query {
        getCursos: [Curso]
        getTecnologia: [Tecnologia]
    }
`

module.exports = typeDefs