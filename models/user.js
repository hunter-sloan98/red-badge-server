const { DataTypes } = require("sequelize");
const db = require('../db');

const User = db.define('user', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM,
    values:['user', 'admin'],
    allowNull: false,
    defaultValue: 'user'
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
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  bio: {
    type: DataTypes.STRING
  }
})

module.exports = User; 