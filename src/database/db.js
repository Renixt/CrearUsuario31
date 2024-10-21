const { Sequelize, DataTypes } = require('sequelize');

// 1. Importar esquema
const UserModel = require('./models/users');
const TernantModel = require('./models/ternant');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME,process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    pool: {
        max:10,
        min:0,
        acquire: 30000,
        idle: 10000
    },
    loggin: false
});

sequelize.authenticate().then(()=>{
    console.log('Database Connected');
}).catch((error)=>{
    console.log(error)
})

const User = UserModel(sequelize, DataTypes);
const Ternant = TernantModel (sequelize, DataTypes);

sequelize.sync({alter: true}).then(()=>{
    console.log('Database && tables was synchronizes!')
}).catch((e) => {
    console.log(e)
    console.log('Error while trying connecting to Database')
})
module.exports = {
    User, Ternant
}
    
