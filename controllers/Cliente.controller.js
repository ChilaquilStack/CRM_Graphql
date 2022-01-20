const getClientes = async () => {
    try {
        const clientes = Cliente.find({})
        return clientes
    } catch (error) {
        console.log(error)
    }
}

const getClientesByVendedor = async (_, {input}, ctx) => {
    try {
        const clientes = await Cliente.find({vendedor: ctx.usuario.id.toString()})
        return clientes
    } catch (error) {
        console.log(clientes)
    }
}

const getCliente = async (_, {id}, ctx) => {
    const cliente = await Cliente.findById(id)
    if(!cliente) throw new Error('El cliente no existe')
    if(cliente.vendedor.toString() === ctx.usuario.id.toString())
        return cliente
    else
        throw new Error('El cliente no te pertenece')
}

const createCliente = async (_, {input}, ctx) => {
    const { email } = input
    try {   
        let cliente = await Cliente.findOne({ email })
        if(cliente) throw new Error('El cliente ya existe')
        cliente = new Cliente(input)
        cliente.vendedor = ctx.usuario.id
        cliente = await cliente.save()
        return cliente
    } catch(error) {
        console.log(error)
    }
}

const updateCliente = async (_, {id, input}, ctx) => {
    try {
        let cliente = await Cliente.findById(id)
        if(!cliente) throw new Error('El cliente no existe')
        if(cliente.vendedor.toString() !== ctx.usuario.id.toString())
            throw new Error('No tienes permisos')
        cliente = await Cliente.findOneAndUpdate({_id: id}, input, {new: true})
        return cliente
    } catch (error) {
        console.log(error)
    }
}

const deleteCliente = async (_, {id}, ctx) => {
    try {
        let cliente = await Cliente.findById(id)
        if(!cliente) throw new Error('No existe el usuario')
        if(cliente.vendedor.toString() !== ctx.usuario.id.toString())
            throw new Error('No tienes permisos')
        cliente = await Cliente.findOneAndDelete(id)
        return cliente
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCliente,
    getClientes,
    updateCliente,
    deleteCliente,
    createCliente,
    getClientesByVendedor
}