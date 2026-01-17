require('dotenv').config() 

const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Importar controladores
const Animal = require('./animal.controller')
const { Auth, isAuthenticated } = require('./auth.controller')

// Puerto del servidor
const port = 3000

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)

    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err))

// Middleware para parsear JSON
app.use(express.json())

// Rutas para animales protegidas por autenticación
app.get('/animals', isAuthenticated, Animal.list)
app.post('/animals', isAuthenticated, Animal.create)
app.put('/animals/:id', isAuthenticated, Animal.update)
app.patch('/animals/:id', isAuthenticated, Animal.update)
app.delete('/animals/:id', isAuthenticated, Animal.destroy)

// Rutas de autenticación
app.post('/login', Auth.login)
app.post('/register', Auth.register)

// Servir archivos estáticos
app.use(express.static('app'))

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

// Ruta 404
app.get('*', (req, res) => {
    res.status(404).send('Esta página no existe :(')
})

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})
