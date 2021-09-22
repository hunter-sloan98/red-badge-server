const Sequelize = require('sequelize');

const squelize = new Sequelize(`postgres://postgres:3bfb197a357945b197eb10150c76f27a@localhost:5432/red-badge-server`)

module.exports = squelize