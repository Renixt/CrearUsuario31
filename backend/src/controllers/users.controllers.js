const { User } = require('../database/db');

// Obtener todos los usuarios con los campos necesarios
const getUser = (req, res) => {
  User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email'] // Seleccionamos solo los campos que necesitamos
  })
    .then((users) => {
      res.send(users); // Enviamos la respuesta con los datos de los usuarios
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error al obtener los usuarios' }); // Manejo de errores en la consulta
    });
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { nombre, apellido, email, username, contrasena, foto } = req.body;
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
      status: 'se creo correctamente',
      message: 'usuario creado correctamente'
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 'NO SE CREÓ EL usuario',
      message: 'usuario NO CREADO',
      error: error
    });
  }
};

// Eliminar un usuario por ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { id } });
    res.send({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 'NO SE ELIMINÓ EL usuario',
      message: 'usuario NO ELIMINADO',
      error: error
    });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [update] = await User.update(
      { firstName: 'Marta', lastName: 'Juarez', photo: 'foto', email: 'marta@gamil.com', username: 'martj', password: 'pp', tenant_id: 1 },
      { where: { id } }
    );

    if (update) {
      const updateUser = await User.findOne({ where: { id } });
      res.status(200).json({
        message: 'usuario actualizado',
        user: updateUser
      });
    } else {
      res.status(404).send({ message: 'usuario no encontrado' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 'NO SE ACTUALIZÓ EL usuario',
      message: 'usuario NO ACTUALIZADO',
      error: error
    });
  }
};

module.exports = {
  createUser,
  getUser,
  deleteUser,
  updateUser
};
