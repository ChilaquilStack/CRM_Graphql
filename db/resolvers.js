const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario.model');

const resolvers = {
    
    Mutation: {
        createUsuario: async (_, {input}) => {
            const { email, password } = input
            const usuarioExists = await Usuario.findOne({email})
            if(usuarioExists) throw new Error('El usuario ya esta registrado')
            const salt = await bcryptjs.genSalt(10)
            input.password = await bcryptjs.hash(password, salt)
            try {
                const usuario = new Usuario(input)
                usuario.save()
                return usuario
            } catch (error) {
                console.log(error)
            }
        }
    }

}

module.exports = resolvers