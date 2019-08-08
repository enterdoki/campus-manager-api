const Sequelize = require('sequelize');
const db = require('../db');

const Students = db.define("students", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    firstName : {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName : {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
    gpa: {
        type: Sequelize.INTEGER,
    },
    campusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "campuses",
            key: "id"
        }
    }

});

module.exports = Students;