const {Sequelize} = require('sequelize')
const sequelize = new Sequelize({
    username:"postgres",
    password:"postgres",
    host:"localhost",
    port:5432,
    dialect:"postgres"
})

module.exports = sequelize


