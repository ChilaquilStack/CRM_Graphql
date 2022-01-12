const mongoose = require('mongoose')

const ClienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    epellido: {
        type: String,
        required: true,
        trim: true
    },
    empresa:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    telefono:{
        type: String,
        trim: true
    },
    vendedor: {
        id: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Cliente', ClienteSchema)