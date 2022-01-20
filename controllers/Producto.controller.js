const useProducto = require('../services/useProducto')

const getProductos = async () => {
    const {data: productos, error} = await useProducto(producto => producto.find({}))
    if(error) return error
    return productos
}

const getProducto = async (_, {id}) => {
    const { data: producto, error } = await useProducto(producto => producto.findById(id))
    if(error) throw new Error(error)
    if(!producto)  throw new Error("Producto no encontrado")
    return producto
}

const createProducto =  async (_, {input}) => {
    const { data: producto, error } = await useProducto((producto) => {
        const newProducto = new producto(input)
        return newProducto.save()
    })
    if(error) return error
    return producto
}

const updateProducto = async (_, {id, input}) => {
    const { data: producto, errorProductoFind } = await useProducto(producto => producto.findById(id))
    const { data: updateProducto, errorProductoUpdata } = await useProducto(producto => 
        producto.findOneAndUpdate({_id: id}, input, {new: true})
    )
    if( !producto ) throw new Error("El producto no existe")
    if( errorProductoFind ) return errorProductoFind
    if( errorProductoUpdata ) return errorProductoUpdata
    return updateProducto
}

const deleteProducto = async (_, {id}) => {
    const { data: producto, errorProductoFind } = await useProducto(producto => producto.findById(id))
    if(errorProductoFind) return errorProductoFind
    if(!producto) throw new Error("El producto no existe")
    const { data: productoDelete, errorProductoDelete } = await useProducto(producto => producto.findOneAndDelete({_id: id}))
    if(errorProductoDelete) return errorProductoDelete
    return productoDelete
}

module.exports = {
    getProducto,
    getProductos,
    createProducto,
    updateProducto,
    deleteProducto
}