const Animals = require('./animal.model')
// traemos el modelo de mongoose que definimos en animal.model.js
// nos permite interactuar con la colección Animal en Mongo

const Animal = {
  // objeto que agrupa funciones relacionadas con los animales
  list: async (req, res) => {
    // función para listar todos los animales
    const animals = await Animals.find()
    // busca todos los documentos en la coleccion de animales
    // devuelve una promesa, por eso usamos await
    res.status(200).send(animals)
    // enviamos al cliente los animales con código HTTP 200 
  },

  create: async (req, res) => {
    // función para crear un nuevo animal
    const animal = new Animals(req.body)
    // creamos un objeto nuevo con los datos enviados en la petición (req.body)
    await animal.save()
    // guardamos el objeto en la base de datos (MongoDB)
    res.status(201).send('chanchito creado!')
    // enviamos respuesta al cliente con código 201 (creado)
  },

  update: async (req, res) => {
    // función para actualizar un animal (aún sinn lógica implementada capaz en un futuro)
    res.status(204).send('actualizando chanchito')
    // enviamos respuesta al cliente con código 204 (sin contenido)
  },

  destroy: async (req, res) => {
    // función para eliminar un animal
    const { id } = req.params
    // obtenemos el id del animal desde la URL
    const animal = await Animals.findOne({ _id: id })
    // buscamos el animal en la base de datos por su _id
    await animal.remove()
    // eliminamos el animal de la base de datos
    res.status(204).send('eliminando chanchito :(')
    // enviamos respuesta al cliente con código 204 (sin contenido)
  }
}

module.exports = Animal
// exportamos el objeto Animal para poder usar estas funciones en otros archivos (por ejemplo en las rutas)
