const mongoose = require('mongoose') 

// creamos el modelo de mongo para los Animales 
const Animals = mongoose.model('Animal', {
	name: { type: String, required: true, minLength: 3 },
	type: { type: String, required: true, minLength: 3 },
})

module.exports = Animals
