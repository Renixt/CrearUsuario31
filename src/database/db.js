const { Sequelize, DataTypes } = require('sequelize');

// Esquemas
const UserModel = require('./models/users');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    pool: {
        max:10,
        min:0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});

sequelize.authenticate().then(() => {
    console.log('Database Connected');
}).catch((error)=> {
    console.log(error)
})

const User = UserModel(sequelize, DataTypes);

sequelize.sync({alter: true}).then(()=> {
    console.log('Database && tables was synchronizes!')
}).catch((e) => {
    console.log(e)
    console.log('Error while trying connecting to Database')
})

module.exports = {
    User
}
