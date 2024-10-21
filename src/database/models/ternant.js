module.exports = (sequelize, type) => {
    return sequelize.define('ternant', {
        id: {
            type: type.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: type.STRING(50),
            allowNull: false
        },
        last_name: {
            type: type.STRING(50)
        },
        email: {
            type: type.STRING(30)
        },
        username: {
            type: type.STRING(30),
            unique: true
        },
        payment_method_id: {
            type: type.BIGINT,
            allowNull: false,
           // references: {
              //  model: 'payment_method', // Tabla relacionada
              //  key: 'id'
           // }
        }
    }, {
        timestamps: false
    });
};
