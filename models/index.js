const db = require('../db');

const UserModel = require('./user');
const BlogModel = require('./blog');
const CharacterModel = require('./character')

//DB Associations



module.exports = {
  dbConnection: db,
  models: {
    UserModel,
    BlogModel,
    CharacterModel
  }
};