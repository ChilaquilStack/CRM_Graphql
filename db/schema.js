const { gql } = require('apollo-server')

const typeDefs = gql`

    type Curso {
        titulo: String
    }

    input CursoInput {
        tecnologia: String
    }
    
    type Tecnologia {
        tecnologia: String
    }

    type Query {
        getCursos(input: CursoInput): [Curso]
        getTecnologia: [Tecnologia]
    }
`

module.exports = typeDefs