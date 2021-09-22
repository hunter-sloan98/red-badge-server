const { DataTypes } = require("sequelize");
const db = require('../db');

const Users = db.define('users', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    required: true,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  birthyear: {
    type: DataTypes.INTEGER
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  bio: {
    type: DataTypes.STRING
  }
})

module.exports = Users; 