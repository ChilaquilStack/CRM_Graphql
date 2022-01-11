const mongoose = require('mongoose')

const UsuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    }, 
    apellido:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
        trim: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Usuario', UsuarioSchema)