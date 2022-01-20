const Producto = require('../models/Producto.model')

const useProducto = async (cb) => {
    let [data, error] = [null, null]
    try {
        data = await cb(Producto)
    } catch (e) {
        error = e
    }
    return { data, error }
}

module.exports = useProducto