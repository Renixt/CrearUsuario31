const { User } = require('../database/db');

const createUser = async (req, res) => {
    try {
        console.log(req.body)
		// desestructuracion
		const { nombre, apellido } = req.body
		console.log(nombre, apellido)
        
        const user = await User.create({
            firstName: nombre,
            lastName: apellido,
        });
        console.log(user)

        res.status(201).send({
			status: "se creo correctamente",
			message: "Contacto creado correctamente"
		})
    } catch (error) {
        console.log(error)
		res.status(400).send({
			status: "NO SE CREÓ EL CONTACTO",
			message: "CONTACTO NO CREADO",
			error: error
		})
    }
}

module.exports = {
    createUser
}

