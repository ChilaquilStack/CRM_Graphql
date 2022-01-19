const Producto = require('../models/Producto.model')

const getProductos = async () => {
    try {
        const productos = await Producto.find({})
        return productos
    } catch (error) {
        console.log(error)
    }
}

const getProducto = async (_, {id}) => {
    try {
        const producto = await Producto.findById(id)
        if(!producto)  throw new Error("Producto no encontrado")
        return producto
    } catch (error) {
        console.log(error)
    }
}

const createProducto =  async (_, {input}) => {
    try {
        const producto = new Producto(input)
        await producto.save()
        return producto
    } catch (error) {
        console.log(error)
    }
}

const updateProducto = async (_, {id, input}) => {
    try {
        let producto = await Producto.findById(id)
        if(!producto) throw new Error("El producto no existe")
        producto = await Producto.findOneAndUpdate({_id: id}, input, {new: true})
        return producto 
    } catch (error) {
        console.log(error)
    }
}

const deleteProducto = async (_, {id}) => {
    try {
        let producto = await Producto.findById(id)
        if(!producto) throw new Error("El producto no existe")
        producto = await Producto.findOneAndDelete({_id: id})
        return producto
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto
}