const Cliente = require('../models/Clientes.model')
const useFetch = require('../services/useFetch.service')

const fetch = useFetch(Cliente)

const getClientes = async () => {
    const { data: clientes, error } = await fetch(cliente => cliente.find())
    if(error) return error    
    if(!clientes.length) return new Error("No hay clientes")
    return clientes
}

const getClientesByVendedor = async (_, {input}, ctx) => {
    const { data: clientes, error } = await fetch(
        cliente => cliente.find({vendedor: ctx.usuario.id.toString()})
    )
    if(error) return error
    return clientes
}

const getCliente = async (_, {id}, ctx) => {
    const {data: cliente, error } = await fetch(cliente => cliente.findById(id))
    if(error) return error
    if(!cliente) throw new Error('El cliente no existe')
    if(cliente.vendedor.toString() === ctx.usuario.id.toString()) return cliente
    else throw new Error('El cliente no te pertenece')
}

const createCliente = async (_, {input}, ctx) => {
    const { email } = input  
    const { data: cliente, error: errorFindOne } = await fetch(cliente => cliente.findOne({ email }))
    if(cliente) throw new Error('El cliente ya existe')
    const {data: newCliente, errorSave } = await fetch(cliente => {
        new cliente(input)
        cliente.vendedor = ctx.usuario.id
        return cliente.save()
    })
    return newCliente
}

const updateCliente = async (_, {id, input}, ctx) => {
    const { data: cliente, errorClienteFind } = await fetch(cliente => cliente.findById(id))
    if(errorClienteFind) return error
    if(!cliente) throw new Error('El cliente no existe')
    if(cliente.vendedor.toString() !== ctx.usuario.id.toString()) throw new Error('No tienes permisos')
    const { data: updateCliente, errorUpdateCliente } = await fetch(cliente => cliente.findOneAndUpdate({_id: id}, input, {new: true}))
    if(errorUpdateCliente) return errorUpdateCliente
    return updateCliente
}

const deleteCliente = async (_, {id}, ctx) => {
    const {data: cliente, error: erroFind } = await fetch(cliente => cliente.findById(id))
    if(!cliente) throw new Error('No existe el usuario')
    if(cliente.vendedor.toString() !== ctx.usuario.id.toString()) throw new Error('No tienes permisos')
    const {data: deleteCliente, error } = await fetch(cliente => cliente.findOneAndDelete(id))
    return deleteCliente
}

module.exports = {
    getCliente,
    getClientes,
    updateCliente,
    deleteCliente,
    createCliente,
    getClientesByVendedor
}