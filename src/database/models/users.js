module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id: {
            type: type.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        // Model attributes are defined here
        firstName: {
            type: type.STRING,
            allowNull: false,
        },
        lastName: {
            type: type.STRING,
            // allowNull defaults to true
        },
    },
    {
      // Other model options go here
    },
)};
