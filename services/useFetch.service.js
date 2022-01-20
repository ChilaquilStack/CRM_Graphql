const Producto = require('../models/Producto.model')

const useProducto = model => async (cb) => {
    let [data, error] = [null, null]
    try {
        data = await cb(model)
    } catch (e) {
        error = e
    }
    return { data, error }
}

module.exports = useProducto