const mongoose = require('mongoose')

const PedidoSchema = mongoose.Schema({
    
    pedido: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        red: 'Cliente'
    },
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        red: 'Usuario'
    },
    estado: {
        type: String,
        default: "PENDIENTE"
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Pedido', PedidoSchema)