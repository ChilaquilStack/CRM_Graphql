const cursos = require('./cursos')

const resolvers = {
    
    Query:{
        getCursos: (_ , {input}, ctx, info) => {
            console.log(ctx)
            return cursos.filter(curso => curso.tecnologia === input.tecnologia)
        },
        getTecnologia: () => cursos
    }

}

module.exports = resolvers