const cursos = require('./cursos')

const resolvers = {
    
    Query:{
        getCursos: (_ , {input}, ctx, info) => cursos.filter(curso => curso.tecnologia === input.tecnologia),
        getTecnologia: () => cursos
    }

}

module.exports = resolvers