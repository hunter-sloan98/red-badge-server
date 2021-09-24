const { DataTypes } = require('sequelize');
const db = require('../db');

const Character = db.define('character', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    required: true
  },
  village: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING
  },
  jutsu: {
    type: DataTypes.STRING
  },
  affiliation: {
    type: DataTypes.STRING
  },
  bio: {
    type: DataTypes.STRING
  },
  creator: {
    type: DataTypes.UUID
  }
})

module.exports = Character;