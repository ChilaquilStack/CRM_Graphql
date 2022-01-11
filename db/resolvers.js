const cursos = require('./cursos')

const resolvers = {
    
    Mutation: {
        createUsuario: (_, {input}) => {
            console.log(input)
            return 'creando'
        }
    }

}

module.exports = resolvers