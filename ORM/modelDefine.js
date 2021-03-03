const DataTypes= require("sequelize")
const sequelize = require("../DataBase/connectionDB")
const users = sequelize.define("user", {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    DOB: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    }
})


module.exports = users