const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario.model')
const Producto = require('../models/Producto.model')
const Cliente = require('../models/Clientes.model')

const resolvers = {

    Query: {
        getUser: async (_, { token }) => {
            const userId = await jwt.verify(token, process.env.SECRET)
            return userId
        },
        getProductos: async () => {
            try {
                const productos = await Producto.find({})
                return productos
            } catch (error) {
                console.log(error)
            }
        },
        getProducto: async (_, {id}) => {
            try {
                const producto = await Producto.findById(id)
                if(!producto)  throw new Error("Producto no encontrado")
                return producto
            } catch (error) {
                console.log(error)
            }
        },
        getClientes: async () => {
            try {
                const clientes = Cliente.find({})
                return clientes
            } catch (error) {
                console.log(error)
            }
        }
    },
    
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
        },
        authUser: async (_, {input}) => {
            const { email, password } = input
            const existsUser = await Usuario.findOne({email})
            if(!existsUser) throw new Error('email y/o password incorrectos')
            const correctPassword = await bcryptjs.compare(password, existsUser.password)
            if(!correctPassword) throw new Error('email y/o password incorrectos')
            const token = jwt.sign({ id: existsUser.id }, process.env.SECRET ,{expiresIn: '24h'})
            return { token }
        },
        createProducto: (_, {input}) => {
            try {
                const producto = new Producto(input)
                producto.save()
                return producto
            } catch (error) {
                console.log(error)
            }
        },
        updateProducto: async (_, {id, input}) => {
            try {
                let producto = await Producto.findById(id)
                if(!producto) throw new Error("El producto no existe")
                producto = await Producto.findOneAndUpdate({_id: id}, input, {new: true})
                return producto 
            } catch (error) {
                console.log(error)
            }
        },
        deleteProducto: async (_, {id}) => {
            try {
                let producto = await Producto.findById(id)
                if(!producto) throw new Error("El producto no existe")
                producto = await Producto.findOneAndDelete({_id: id})
                return producto
            } catch (error) {
                console.log(error)
            }
        },
        createCliente: async (_, {input}, ctx) => {
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
    }

}

module.exports = resolvers