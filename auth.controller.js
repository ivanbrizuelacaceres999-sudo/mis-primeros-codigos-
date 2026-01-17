const express = require('express')
const bcrypt = require('bcrypt')
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const User = require('./user.model') // asegurate de que tu modelo se llama User

// Middleware para validar JWT
const validateJwt = expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] })

// Función para firmar token
const signToken = _id => jwt.sign({ _id }, process.env.SECRET)

// Middleware para encontrar al usuario y asignarlo a req.user
const findAndAssignUser = async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.user._id)
        if (!foundUser) return res.status(401).end()
        req.user = foundUser
        next()
    } catch (e) {
        next(e)
    }
}

// Middleware final para proteger rutas
const isAuthenticated = express.Router().use(validateJwt, findAndAssignUser)

// Objeto Auth con métodos login y register
const Auth = {
    login: async (req, res) => {
        const { body } = req
        try {
            const user = await User.findOne({ email: body.email })
            if (!user) {
                return res.status(401).send('Usuario y/o contraseña inválida')
            }
            const isMatch = await bcrypt.compare(body.password, user.password)
            if (isMatch) {
                const signed = signToken(user._id)
                res.status(200).send(signed)
            } else {
                res.status(401).send('Usuario y/o contraseña inválida')
            }
        } catch (e) {
            res.status(500).send(e.message)
        }
    },

    register: async (req, res) => {
        const { body } = req
        try {
            const isUser = await User.findOne({ email: body.email })
            if (isUser) {
                return res.status(400).send('Usuario ya existe')
            }
            const salt = await bcrypt.genSalt()
            const hashed = await bcrypt.hash(body.password, salt)
            const newUser = await User.create({ email: body.email, password: hashed, salt })
            const signed = signToken(newUser._id)
            res.status(201).send(signed)
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
}

module.exports = { Auth, isAuthenticated }
