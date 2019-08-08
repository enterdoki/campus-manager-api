const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://campus:campusmanager@campus.clgjnattbiei.us-east-2.rds.amazonaws.com:5432/postgres');

module.exports = db;
