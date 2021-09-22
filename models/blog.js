const { DataTypes } = require('sequelize');
const db = require('../db');

const Blog = db.define('blog', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  episode: {
    type: DataTypes.INTEGER
  },
  rating: {
    type: DataTypes.INTEGER
  },
  post: {
    type: DataTypes.STRING
  },
  reccomend: {
    type: DataTypes.STRING
  }
})

module.exports = Blog;