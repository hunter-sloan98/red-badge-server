const Sequelize = require('sequelize');

const sequelize = new Sequelize(`postgres://postgres:3bfb197a357945b197eb10150c76f27a@localhost:5432/red-badge-server`)

// const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
//   host: process.env.DATABASE_HOST,
//   dialect: process.env.DATABASE_DIALECT
// })

module.exports = sequelize