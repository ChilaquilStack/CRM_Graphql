const cursos = require('./cursos')

const resolvers = {
    
    Query:{
        getCursos: () => cursos,
        getTecnologia: () => cursos
    }

}

module.exports = resolvers