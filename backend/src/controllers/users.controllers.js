const { User } = require('../database/db');

//PORQUE ASYNC?
//BUSQUEDA ESPECIFICA
//user.findall({where: {firstName: "Renata"}})
const getUser =  (req,res) => {
    User.findAll()
    .then((users) => {
        res.send(users);
    })
    .catch((err) => {
        console.log(err);
    });
};

const createUser = async (req,res) => {
    try {
        const {nombre, apellido, email, username, contrasena,foto} = req.body;
        const user = await User.create({
            firstName: nombre,
            lastName: apellido,
            photo: foto,
            email: email,
            username: username,
            password: contrasena,
            tenant_id: 1
        });

        res.status(201).send({
			status: "se creo correctamente",
			message: "usuario creado correctamente"
		});
    } catch (error) {
        console.log(error)
		res.status(400).send({
			status: "NO SE CREÓ EL usuario",
			message: "usuario NO CREADO",
			error: error
		})
    }
};
   

const deleteUser = async (req,res) => {
    const {id} = req.params;
    User.destroy({where: {id}});
    res.send("delete");
};

const updateUser = async (req, res) => {
    const {id} = req.params;

    try{
        const [update] = await User.update(
            {firstName:"Marta", lastName:"Juarez", photo: "foto", email: "marta@gamil.com",username: "martj",password:"pp", tenant_id:1 }, {where: {id}}
        );

        if (update) {
            const updateUser = await User.findOne({where: {id}});
            res.status(200).json({
                message: 'usuario actualizado',
                user: updateUser
            });
        } else {
            res.status(404).send({message: 'usuario no encontrado'});
        }

    } catch(error){
        console.log(error);
        res.status(400).send({
            status: "NO SE ACTUALIZÓ EL usuario",
            message: "usuario NO ACTUALIZADO",
            error: error
        });
    }
};


/*
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
}*/



module.exports = {
    createUser,
    getUser,
    deleteUser,
    updateUser
}

