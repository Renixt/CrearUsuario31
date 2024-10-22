module.exports = (Sequelize, type) => {
  return Sequelize.define('users', {
    id: {
      type: type.BIGINT, 
      autoIncrement: true,
      primaryKey: true
    },
    // Nombre del usuario
    firstName: {
      type: type.STRING,
      allowNull: false
    },
    // Apellido del usuario
    lastName: {
      type: type.STRING,
    },
    // Correo electrónico
    email: {
      type: type.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // Nombre de usuario
    username: {
      type: type.STRING(30),
      allowNull: false,
      unique: true
    },
    // Clave foránea (tenant_id)
    tenant_id: {
      type: type.BIGINT,
      allowNull: false,
      
      references: {
        model: 'tenants', // Nombre de la tabla a la que hace referencia
        key: 'id'
      } 
    }
  },
  {
    timestamps: true, // Para mantener createdAt y updatedAt
  });
};

